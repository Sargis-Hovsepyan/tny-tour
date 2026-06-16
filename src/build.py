#!/usr/bin/env python3
"""
Build step for the Romania student-tour brochure.

Fetches royalty-free PLACEHOLDER photos (Wikimedia Commons) + one display font,
compresses the photos (macOS `sips`), base64-embeds everything, and injects it
into src/template.html -> index.html so the page is a single self-contained file.

Run from anywhere: `python3 src/build.py`. Writes the published index.html to the
repo root and the photo credits to docs/. Nothing here is shipped except index.html.
"""
import base64, json, mimetypes, os, re, subprocess, sys, tempfile, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))   # .../src
ROOT = os.path.dirname(HERE)                          # repo root
TEMPLATE = os.path.join(HERE, "template.html")
OUT = os.path.join(ROOT, "index.html")
CREDITS = os.path.join(ROOT, "docs", "PHOTO-CREDITS.txt")
UA = "TNYTourBrochureBuilder/1.0 (educational tour brochure; contact hello@tnytour.example)"

# key -> (search query, max-dimension px, jpeg quality)
PHOTOS = [
    ("hero",           "Transfagarasan road Fagaras mountains Romania", 1800, 72),
    ("bran",           "Bran Castle Romania exterior",                  1400, 66),
    ("peles",          "Peles Castle Sinaia Romania",                   1400, 66),
    ("brasov",         "Brasov Council Square old town Romania",        1400, 66),
    ("sighisoara",     "Sighisoara Clock Tower citadel Romania",        1400, 66),
    ("sibiu",          "Sibiu Grand Square Romania",                    1400, 66),
    ("transfagarasan", "Balea Lake Transfagarasan Romania",            1400, 66),
    ("parliament",     "Palace of the Parliament Bucharest",            1400, 66),
    ("mountains",      "Carpathian Mountains Romania landscape",        1400, 66),
]
RASTER = ("image/jpeg", "image/png", "image/webp")


def fetch(url, binary=False, timeout=40):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def commons_image(query, want_w):
    """Search Commons for a freely-licensed raster image; return (thumburl, meta)."""
    api = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&generator=search&gsrnamespace=6&gsrlimit=8"
           "&gsrsearch=" + urllib.parse.quote(query) +
           "&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=" + str(want_w))
    pages = json.loads(fetch(api)).get("query", {}).get("pages", {})
    # search results carry an 'index'; keep that order
    for p in sorted(pages.values(), key=lambda x: x.get("index", 999)):
        ii = (p.get("imageinfo") or [{}])[0]
        if ii.get("mime") in RASTER and ii.get("thumburl"):
            m = ii.get("extmetadata", {})
            def g(k):
                v = m.get(k, {}).get("value", "")
                return re.sub("<[^>]+>", "", v).strip()
            return ii["thumburl"], {
                "title": p.get("title", ""),
                "artist": g("Artist") or "Unknown",
                "license": g("LicenseShortName") or "see source",
                "source": ii.get("descriptionurl", ""),
            }
    raise RuntimeError("no raster result for: " + query)


def compress(raw, maxdim, quality):
    """Recompress to JPEG via sips; fall back to the original bytes on failure."""
    try:
        with tempfile.TemporaryDirectory() as d:
            i, o = os.path.join(d, "i"), os.path.join(d, "o.jpg")
            open(i, "wb").write(raw)
            subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions",
                            str(quality), "-Z", str(maxdim), i, "--out", o],
                           check=True, capture_output=True)
            return open(o, "rb").read(), "image/jpeg"
    except Exception as e:
        print("   ! sips failed (%s); embedding original" % e)
        return raw, "image/jpeg"


def data_uri(raw, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(raw).decode("ascii"))


def get_display_font():
    """Grab the Latin woff2 of Playfair Display from Google Fonts and embed it."""
    try:
        chrome = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124 Safari/537.36")
        req = urllib.request.Request(
            "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
            headers={"User-Agent": chrome})
        css = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
        # pick the block commented /* latin */ (not latin-ext)
        blocks = re.split(r"/\*\s*([\w-]+)\s*\*/", css)
        url = None
        for i in range(1, len(blocks), 2):
            if blocks[i] == "latin":
                m = re.search(r"url\((https://[^)]+\.woff2)\)", blocks[i + 1])
                if m:
                    url = m.group(1); break
        if not url:
            m = re.search(r"url\((https://[^)]+\.woff2)\)", css)
            url = m.group(1) if m else None
        if not url:
            raise RuntimeError("woff2 url not found")
        woff = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": chrome}),
                                      timeout=30).read()
        print("   font: Playfair Display latin woff2 %.0f KB" % (len(woff) / 1024))
        return 'url(%s) format("woff2")' % data_uri(woff, "font/woff2")
    except Exception as e:
        print("   ! font fetch failed (%s); falling back to Georgia" % e)
        return 'local("Georgia")'


def main():
    if not os.path.exists(TEMPLATE):
        sys.exit("template.html not found")
    print("Fetching display font...")
    font_src = get_display_font()

    images, credits = {}, []
    for key, query, w, q in PHOTOS:
        print("Fetching photo: %-14s <- %s" % (key, query))
        try:
            thumb, meta = commons_image(query, w)
            raw, mime = compress(fetch(thumb, binary=True), w, q)
            images[key] = data_uri(raw, mime)
            print("   %.0f KB embedded  (%s)" % (len(images[key]) / 1024, meta["license"]))
            credits.append((key, meta))
        except Exception as e:
            print("   ! FAILED (%s) — leaving %s blank" % (e, key))
            images[key] = ""

    html = open(TEMPLATE, encoding="utf-8").read()
    note = ("Placeholder photography from Wikimedia Commons contributors — see "
            "PHOTO-CREDITS.txt. Replace with your own photos before publishing.")
    html = html.replace("__FONT_DISPLAY__", font_src)
    html = html.replace("__CREDITS_NOTE__", note)
    html = html.replace("__IMAGES_MAP__", json.dumps(images))
    open(OUT, "w", encoding="utf-8").write(html)

    with open(CREDITS, "w", encoding="utf-8") as f:
        f.write("PLACEHOLDER PHOTO CREDITS\n")
        f.write("These images are placeholders from Wikimedia Commons. If you keep any\n")
        f.write("of them in a published page you must credit the author per its licence;\n")
        f.write("otherwise replace them with your own photos (see HOW-TO-EDIT.md).\n\n")
        for key, m in credits:
            f.write("[%s] %s\n  by %s | %s\n  %s\n\n" %
                    (key, m["title"], m["artist"], m["license"], m["source"]))

    size = os.path.getsize(OUT) / (1024 * 1024)
    print("\nWrote %s  (%.2f MB)" % (OUT, size))
    print("Wrote %s" % CREDITS)
    if size > 8:
        print("WARNING: file is large for email; lower quality/width in PHOTOS and re-run.")


if __name__ == "__main__":
    main()
