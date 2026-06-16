# Romania Student Tour — Brochure

A single-page marketing brochure for a supervised student group tour to Romania, aimed
at parents. It's a **self-contained `index.html`** — all CSS, JavaScript, photos and the
display font are inlined, so it works offline, opens by double-click, and can be emailed
or hosted as-is. No build server or backend.

**Live page:** https://sargis-hovsepyan.github.io/tny-tour/
*(enable once via repo Settings → Pages → Deploy from a branch → `main` / `root`)*

## Preview

Open `index.html` in any browser (double-click), or visit the live URL above.

## Edit it

Everything on the page is driven by a `CONFIG` block at the top of `index.html` — change
the text between the quotes. Colours live in the `:root` CSS block. To swap photos, use
the included **`encoder.html`** helper. Full instructions, including how to share it and
turn it into a PDF, are in **`HOW-TO-EDIT.md`**.

> All dates, prices, the refund policy, contact details, and reviews are realistic
> **placeholders** — replace them with real, accurate information before sending.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The brochure (the file served by GitHub Pages). |
| `encoder.html` | Offline helper to convert your own photos into paste-in text. |
| `HOW-TO-EDIT.md` | Guide: edit text, swap photos, share via link, export PDF. |
| `PHOTO-CREDITS.txt` | Attribution for the placeholder photos. |
| `template.html`, `build.py` | Developer source used to generate `index.html`. |

## Photo / content notice

The page code is MIT-licensed (see `LICENSE`). The embedded **placeholder photos** are
from Wikimedia Commons under their own licenses (mostly CC BY-SA, see `PHOTO-CREDITS.txt`)
and must be credited or replaced before publishing.
