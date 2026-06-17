# Romania Student Tour — how to edit & share

The site is a multi-file static page hosted on **GitHub Pages**. The live URL is:
**https://sargis-hovsepyan.github.io/tny-tour/**

To edit, change the files locally, then `git push` to deploy. No build step needed.

---

## Project structure

```
index.html                  the page (edit text here)
assets/css/styles.css       design tokens, colours, layout
assets/js/main.js           motion, nav, scroll effects
assets/js/vendor/           GSAP, ScrollTrigger, Lenis (pinned)
assets/img/                 hero, showcase, and logo images
assets/fonts/               Fraunces + Inter woff2
docs/romania-tour-agenda.pdf  original tour agenda (Armenian)
docs/HOW-TO-EDIT.md         this file
docs/PHOTO-CREDITS.txt      placeholder photo attributions
tools/prep-assets.py        regenerate images + fonts from Wikimedia
```

## 1. Change text (dates, prices, itinerary, reviews, contact)

Open `index.html` in a text editor. The content is plain HTML in labelled sections
(look for `<!-- ===== PRICING ===== -->` etc.). Edit the text between the tags directly.

The **itinerary** uses `<article class="day-card">` blocks — each day has a
`<ul class="schedule">` with `<li><time>...</time><span>...</span></li>` rows.
To add or remove a day, copy or delete an entire `<article class="day-card">` block.

## 2. Change colours

Open `assets/css/styles.css` and find the `:root` block:
- `--brand:#17A2A2` — teal
- `--coral:#FF6F5E` — coral (CTAs)
- `--bg:#FAF9F6` — page background

## 3. Swap photos

**Hero slideshow**: replace `hero-768.jpg`, `hero-1280.jpg`, `hero-1920.jpg` with your
images at those widths. The hero cycles through 4 images — the other 3 are the `-wide.jpg`
showcase images.

**Showcase panels**: replace `peles-wide.jpg`, `bran-wide.jpg`, `parliament-wide.jpg`,
`transfagarasan-wide.jpg` (1400px wide recommended).

**Logos**: `tny-logo.png` and `luna-tour-logo.png` — transparent PNGs.

## 4. Deploy

```
git add -A
git commit -m "update tour content"
git push
```

GitHub Pages republishes in ~1 minute. No build step.

## 5. Before you send it — replace every placeholder

- [ ] **Prices** — confirm final amount, deposit, payment schedule
- [ ] **Cancellation policy** — add real terms
- [ ] **Testimonials** — replace samples with genuine consented reviews
- [ ] **Company details** — licence number, registration number
- [ ] **Photos** — swap Wikimedia placeholders for your own trip photos

## 6. Preview locally

```
python3 -m http.server 8080
```

Open `http://localhost:8080/` — all asset paths resolve correctly.
