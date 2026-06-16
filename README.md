# Romania Student Tour — Brochure

A single-page marketing brochure for a supervised student group tour to Romania, aimed
at parents. The published page is a **self-contained `index.html`** — all CSS, JavaScript,
photos and the display font are inlined, so it works offline, opens by double-click, and
can be emailed or hosted as-is. No build server or backend.

**Live page:** https://sargis-hovsepyan.github.io/tny-tour/
*(enable once via repo Settings → Pages → Deploy from a branch → `main` / `root`)*

## Project structure

```
tny-tour/
├── index.html          # the published brochure (GitHub Pages serves this from root)
├── README.md
├── LICENSE
├── .nojekyll           # tell GitHub Pages to serve files as-is (no Jekyll)
├── src/
│   ├── template.html   # editable source (no huge base64) — the brochure's markup/CSS/JS
│   └── build.py        # regenerates ../index.html (embeds photos + font)
├── tools/
│   └── encoder.html    # offline helper: drag a photo → get base64 text to paste in
└── docs/
    ├── HOW-TO-EDIT.md  # non-developer guide: edit text, swap photos, share, export PDF
    └── PHOTO-CREDITS.txt
```

`index.html` is a **generated artifact** (built from `src/template.html`) but is committed
because GitHub Pages serves it directly. Day-to-day text/price edits can be made straight
in `index.html`; structural changes go in `src/template.html` followed by a rebuild.

## Preview

Open `index.html` in any browser (double-click), or visit the live URL above.

## Edit it

Everything on the page is driven by a `CONFIG` block at the top of `index.html` — change
the text between the quotes. Colours live in the `:root` CSS block. To swap photos, use
`tools/encoder.html`. Full instructions, including how to share it and export a PDF, are
in **`docs/HOW-TO-EDIT.md`**.

> All dates, prices, the refund policy, contact details, and reviews are realistic
> **placeholders** — replace them with real, accurate information before sending.

## Rebuild (developers)

```
python3 src/build.py
```

Fetches placeholder photos from Wikimedia Commons + a Playfair Display font, compresses
them with macOS `sips`, base64-embeds everything, and writes `index.html` to the repo
root and credits to `docs/PHOTO-CREDITS.txt`. Needs internet and macOS `sips`.

## Photo / content notice

The page code is MIT-licensed (see `LICENSE`). The embedded **placeholder photos** are
from Wikimedia Commons under their own licenses (mostly CC BY-SA, see
`docs/PHOTO-CREDITS.txt`) and must be credited or replaced before publishing.
