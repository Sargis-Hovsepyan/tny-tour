# Romania Student Tour — how to edit & share

The site is a multi-file static page hosted on **GitHub Pages**. The live URL is:
**https://sargis-hovsepyan.github.io/tny-tour/**

To edit, change the files locally, then `git push` to deploy. No build step needed.

---

## Project structure

```
index.html                  the page (edit text here)
assets/css/styles.css       design tokens, colours, layout
assets/js/main.js           motion, nav, lightbox, carousel
assets/js/vendor/           GSAP, ScrollTrigger, Lenis (pinned)
assets/img/                 responsive JPG images
assets/fonts/               Fraunces + Inter woff2
tools/prep-assets.py        regenerate images + fonts from Wikimedia
docs/HOW-TO-EDIT.md         this file
docs/PHOTO-CREDITS.txt      placeholder photo attributions
```

## 1. Change text (dates, prices, itinerary, reviews, contact)

Open `index.html` in a text editor (VS Code, Notepad, etc.). The content is plain HTML
in labelled sections (look for `<!-- ===== PRICING ===== -->` etc.). Edit the text
between the tags directly. Save and reload in a browser.

To **add** an itinerary day, gallery photo, review, or FAQ: copy one block and edit the
copy. To **remove** one, delete its block.

## 2. Change colours

Open `assets/css/styles.css` and find the `:root` block. Change the hex values:
- `--brand:#17A2A2` is the teal
- `--accent:#FF6F5E` is the coral (CTAs)
- `--bg:#FBFAF7` is the page background

## 3. Swap photos

Drop your optimized image into `assets/img/` using the **same filename** the HTML
references (e.g. `bran-800.jpg`). If you have multiple sizes, replace all three
(e.g. `bran-400.jpg`, `bran-800.jpg`, `bran-1200.jpg`).

To regenerate all placeholder photos from Wikimedia: `python3 tools/prep-assets.py`

## 4. Deploy

```
git add -A
git commit -m "update tour dates"
git push
```

GitHub Pages republishes in ~1 minute. No build step.

## 5. Before you send it — replace every placeholder

- [ ] Tour **dates**, duration, ages, group size, chaperone ratio
- [ ] All **prices**, currency, deposit, early-bird, and payment deadlines
- [ ] The **refund / cancellation policy** (legally meaningful)
- [ ] Whether **flights** are included, departure airport, and meeting point
- [ ] **Contact details**: WhatsApp number, phone, email
- [ ] **Testimonials** — replace samples with genuine consented reviews
- [ ] **Company** name, licence number, registration number, address
- [ ] **Photos** — swap Wikimedia placeholders for your own

## 6. Preview locally

```
python3 -m http.server
```

Open `http://localhost:8000/` — all asset paths resolve correctly.
