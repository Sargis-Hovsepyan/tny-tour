#!/usr/bin/env python3
"""
Asset preparation for the TNY Romania Tour site.

Downloads placeholder photos from Wikimedia Commons, outputs responsive JPEG
(+ WebP if cwebp is installed) into assets/img/, fetches self-hosted web fonts
into assets/fonts/, and writes photo credits to docs/.

Run from the project root:  python3 tools/prep-assets.py
"""
import json, os, re, shutil, subprocess, sys, tempfile, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "assets", "img")
FONT_DIR = os.path.join(ROOT, "assets", "fonts")
CREDITS = os.path.join(ROOT, "docs", "PHOTO-CREDITS.txt")
CACHE = os.path.join(ROOT, "tools", ".cache")
UA = "TNYTourAssetPrep/2.0 (educational tour site; contact hello@tnytour.example)"
HAS_CWEBP = shutil.which("cwebp") is not None

# key -> (search query, responsive widths, jpeg quality)
PHOTOS = [
    ("hero",           "Transfagarasan road Fagaras mountains Romania", [1920, 1280, 768], 72),
    ("bran",           "Bran Castle Romania exterior",                  [1200, 800, 400], 66),
    ("peles",          "Peles Castle Sinaia Romania",                   [1200, 800, 400], 66),
    ("brasov",         "Brasov Council Square old town Romania",        [1200, 800, 400], 66),
    ("sighisoara",     "Sighisoara Clock Tower citadel Romania",        [1200, 800, 400], 66),
    ("sibiu",          "Sibiu Grand Square Romania",                    [1200, 800, 400], 66),
    ("transfagarasan", "Balea Lake Transfagarasan Romania",            [1200, 800, 400], 66),
    ("parliament",     "Palace of the Parliament Bucharest",            [1200, 800, 400], 66),
    ("mountains",      "Carpathian Mountains Romania landscape",        [1200, 800, 400], 66),
]
RASTER = ("image/jpeg", "image/png", "image/webp")

FONTS = [
    ("Fraunces",     "700",  "fraunces-700.woff2"),
    ("Inter",        "400",  "inter-400.woff2"),
    ("Inter",        "500",  "inter-500.woff2"),
    ("Inter",        "600",  "inter-600.woff2"),
]


def fetch(url, binary=False, timeout=40, ua=UA):
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def commons_image(query, want_w):
    api = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&generator=search&gsrnamespace=6&gsrlimit=8"
           "&gsrsearch=" + urllib.parse.quote(query) +
           "&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=" + str(want_w))
    pages = json.loads(fetch(api)).get("query", {}).get("pages", {})
    for p in sorted(pages.values(), key=lambda x: x.get("index", 999)):
        ii = (p.get("imageinfo") or [{}])[0]
        if ii.get("mime") in RASTER and ii.get("thumburl"):
            m = ii.get("extmetadata", {})
            def g(k):
                v = m.get(k, {}).get("value", "")
                return re.sub("<[^>]+>", "", v).strip()
            return ii["thumburl"], ii.get("url", ii["thumburl"]), {
                "title": p.get("title", ""),
                "artist": g("Artist") or "Unknown",
                "license": g("LicenseShortName") or "see source",
                "source": ii.get("descriptionurl", ""),
            }
    raise RuntimeError("no raster result for: " + query)


def download_original(key, query, max_w):
    cached = os.path.join(CACHE, f"{key}_orig.jpg")
    if os.path.exists(cached) and os.path.getsize(cached) > 10000:
        return cached
    _, full_url, meta = commons_image(query, max_w)
    thumb_url, _, _ = commons_image(query, max_w)
    raw = fetch(thumb_url, binary=True)
    os.makedirs(CACHE, exist_ok=True)
    open(cached, "wb").write(raw)
    return cached


def resize_jpeg(src, dst, width, quality):
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions",
                    str(quality), "-Z", str(width), src, "--out", dst],
                   check=True, capture_output=True)


def to_webp(jpg_path, webp_path, quality):
    if not HAS_CWEBP:
        return False
    subprocess.run(["cwebp", "-q", str(quality), jpg_path, "-o", webp_path],
                   check=True, capture_output=True)
    return True


def make_og_cover(hero_src, dst):
    with tempfile.TemporaryDirectory() as d:
        tmp = os.path.join(d, "og.jpg")
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80",
                        "-Z", "1200", hero_src, "--out", tmp],
                       check=True, capture_output=True)
        subprocess.run(["sips", "-c", "630", "1200", tmp, "--out", dst],
                       check=True, capture_output=True)


def fetch_google_font_woff2(family, weight, out_path):
    chrome_ua = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                 "(KHTML, like Gecko) Chrome/124 Safari/537.36")
    url = (f"https://fonts.googleapis.com/css2?family={urllib.parse.quote(family)}"
           f":wght@{weight}&display=swap")
    css = fetch(url, ua=chrome_ua)
    blocks = re.split(r"/\*\s*([\w-]+)\s*\*/", css)
    woff_url = None
    for i in range(1, len(blocks), 2):
        if blocks[i] == "latin":
            m = re.search(r"url\((https://[^)]+\.woff2)\)", blocks[i + 1])
            if m:
                woff_url = m.group(1)
                break
    if not woff_url:
        m = re.search(r"url\((https://[^)]+\.woff2)\)", css)
        woff_url = m.group(1) if m else None
    if not woff_url:
        raise RuntimeError(f"woff2 URL not found for {family} {weight}")
    data = fetch(woff_url, binary=True, ua=chrome_ua)
    open(out_path, "wb").write(data)
    return len(data)


def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    os.makedirs(FONT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(CREDITS), exist_ok=True)

    if not HAS_CWEBP:
        print("NOTE: cwebp not found; outputting JPEG only. Run `brew install webp` to enable WebP.\n")

    # --- Fonts ---
    print("Fetching fonts...")
    for family, weight, filename in FONTS:
        out = os.path.join(FONT_DIR, filename)
        if os.path.exists(out) and os.path.getsize(out) > 5000:
            print(f"  {filename}: cached ({os.path.getsize(out)//1024} KB)")
            continue
        sz = fetch_google_font_woff2(family, weight, out)
        print(f"  {filename}: {sz//1024} KB")

    # --- Photos ---
    credits_list = []
    for key, query, widths, q in PHOTOS:
        print(f"\nPhoto: {key} <- {query}")
        try:
            _, _, meta = commons_image(query, max(widths))
            cached = download_original(key, query, max(widths))
            for w in widths:
                jpg = os.path.join(IMG_DIR, f"{key}-{w}.jpg")
                resize_jpeg(cached, jpg, w, q)
                sz = os.path.getsize(jpg) // 1024
                print(f"  {key}-{w}.jpg: {sz} KB")
                webp = os.path.join(IMG_DIR, f"{key}-{w}.webp")
                if to_webp(jpg, webp, q):
                    print(f"  {key}-{w}.webp: {os.path.getsize(webp)//1024} KB")
            credits_list.append((key, meta))
        except Exception as e:
            print(f"  FAILED: {e}")

    # OG cover from hero
    hero_src = os.path.join(IMG_DIR, "hero-1280.jpg")
    og_dst = os.path.join(IMG_DIR, "og-cover.jpg")
    if os.path.exists(hero_src):
        try:
            make_og_cover(hero_src, og_dst)
            print(f"\nog-cover.jpg: {os.path.getsize(og_dst)//1024} KB")
        except Exception as e:
            print(f"\nog-cover.jpg FAILED: {e}")

    # --- Credits ---
    with open(CREDITS, "w", encoding="utf-8") as f:
        f.write("PLACEHOLDER PHOTO CREDITS\n")
        f.write("These images are placeholders from Wikimedia Commons. If you keep any\n")
        f.write("of them in a published page you must credit the author per its licence;\n")
        f.write("otherwise replace them with your own photos.\n\n")
        for key, m in credits_list:
            f.write("[%s] %s\n  by %s | %s\n  %s\n\n" %
                    (key, m["title"], m["artist"], m["license"], m["source"]))
    print(f"\nWrote {CREDITS}")

    # --- Summary ---
    imgs = [f for f in os.listdir(IMG_DIR) if f.endswith((".jpg", ".webp"))]
    fonts = [f for f in os.listdir(FONT_DIR) if f.endswith(".woff2")]
    total_kb = sum(os.path.getsize(os.path.join(IMG_DIR, f)) for f in imgs) // 1024
    print(f"\nDone: {len(imgs)} images ({total_kb} KB), {len(fonts)} fonts")


if __name__ == "__main__":
    main()
