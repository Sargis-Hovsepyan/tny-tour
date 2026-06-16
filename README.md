# Romania Student Tour — TNY Educational Center

A marketing landing page for a supervised student educational tour to Romania, organized
by **TNY Educational Center** (Ejmiatsin & Yerevan, Armenia). Aimed at parents. Built as
a multi-file static site on GitHub Pages with scroll-driven animations (GSAP + Lenis),
responsive images, and self-hosted web fonts.

**Live page:** https://sargis-hovsepyan.github.io/tny-tour/

## Project structure

```
index.html                      hand-authored semantic HTML (the page)
assets/
  css/styles.css                design system (teal #17A2A2 + coral #FF6F5E)
  js/main.js                   Lenis smooth scroll, GSAP ScrollTrigger, nav, lightbox, reveals
  js/vendor/                   pinned: gsap 3.12.5, ScrollTrigger, lenis 1.1.13
  img/                         responsive JPG (hero 1920/1280/768, gallery 1200/800/400)
  fonts/                       Fraunces 700 + Inter 400/500/600 woff2
tools/prep-assets.py           downloads Wikimedia photos, optimizes to assets/img, fetches fonts
docs/HOW-TO-EDIT.md            non-developer editing & deploy guide
docs/PHOTO-CREDITS.txt         placeholder photo attributions (CC BY-SA)
```

No build step. Deploy = `git push` to `main`. Pages serves from root.

## Preview locally

```
python3 -m http.server
# open http://localhost:8000/
```

## Regenerate placeholder assets

```
python3 tools/prep-assets.py
```

Downloads photos from Wikimedia Commons, outputs responsive JPEG at multiple widths into
`assets/img/`, fetches Fraunces + Inter woff2 into `assets/fonts/`, and writes credits
to `docs/PHOTO-CREDITS.txt`. Run `brew install webp` first to also generate WebP.

## Brand

- **TNY Educational Center** — English school, Ejmiatsin & Yerevan, est. 2014
- Palette: teal `#17A2A2` + coral `#FF6F5E` on warm paper `#FBFAF7`
- Display: Fraunces (serif), Body: Inter (sans)
- TNY house/roof logo in nav and favicon

## Photo / content notice

The page code is MIT-licensed (see `LICENSE`). Embedded placeholder photos are from
Wikimedia Commons under CC BY-SA — see `docs/PHOTO-CREDITS.txt`. All dates, prices,
reviews, and contact details are **placeholders** to replace before publishing.
