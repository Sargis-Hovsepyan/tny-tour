# Romania Student Tour brochure — how to edit & share

You have a single file, **`index.html`**, that is your whole brochure. It opens in any
web browser on any computer or phone, works offline, and can be emailed or shared as a
link. Everything below tells you how to change it and send it. No coding experience needed.

---

## The files in this project

| File | What it is |
|------|-----------|
| **`index.html`** (root) | The brochure. This is the only file you actually send. |
| **`tools/encoder.html`** | A helper to turn your own photos into text you can paste in. |
| `docs/PHOTO-CREDITS.txt` | Who took the placeholder photos (replace them — see below). |
| `src/template.html`, `src/build.py` | Developer files used to build `index.html`. You can ignore these. |
| `docs/HOW-TO-EDIT.md` | This guide. |

To preview the brochure: **double-click `index.html`** (in the project root).

---

## 1. Change the words (dates, prices, itinerary, reviews, contact)

1. Open `index.html` in a plain-text editor — VS Code, Notepad (Windows), or TextEdit
   on Mac (use *Format → Make Plain Text* first).
2. Search (Ctrl/Cmd+F) for **`const CONFIG`**. Everything you read on the page lives in
   this block.
3. Change the text **between the quotation marks**. Keep the quotes and the commas.
   - Example: change `headline:"7 Days in Romania, Built for Students"` to your own line.
4. To **add** an itinerary day, gallery photo, review, or FAQ: copy one `{ ... }` block
   (including its trailing comma) and edit the copy. To **remove** one, delete its block.
5. Save, then re-open `index.html` in your browser to see the change.

> If something breaks (a blank page), you most likely deleted a quote, comma, or bracket.
> Undo your last change (Ctrl/Cmd+Z) and try again.

## 2. Change the colours

Search for **`:root`** near the top. Change the colour codes (e.g. `--brand:#1f513f;`
is the main green, `--accent:#c9a14a;` is the gold). Save and reload.

## 3. Swap in your own photos

The placeholder photos are stored as text near the bottom of `index.html` (search for
`window.IMAGES`). To replace one:

1. Open **`tools/encoder.html`** in your browser.
2. Pick which photo slot it's for (e.g. `bran`), drop your photo in — it shrinks and
   compresses it automatically.
3. Click **Copy the text**.
4. In `index.html`, find that slot name in quotes (e.g. `"bran":`) and replace its line
   with what you copied. Save and reload.

Keep the slot names the same (`hero`, `bran`, `peles`, …). Try to keep each photo under
~300 KB (the encoder's default settings do this) so the file stays easy to email.

---

## 4. Sending it — pick the way that suits you

**The same `index.html` works for all of these.**

### A. As a file (no hosting, simplest)
- **Email / WhatsApp:** attach `index.html`. The person saves it and double-clicks to open.
- **Download link (Google Drive, Dropbox, WeTransfer):** upload `index.html`, get a share
  link, send the link. Note: from these services the person usually has to **download**
  the file first, then open it — it won't display straight away in the browser.

### B. As a proper clickable web link (opens instantly)
A link that opens the page the moment someone clicks it requires the file to be placed
online. Free options, ~5 minutes, no cost, no server to manage:
- **Netlify Drop** — go to `app.netlify.com/drop` and drag `index.html` onto the page.
  You instantly get a link like `https://your-name.netlify.app`.
- **Cloudflare Pages** or **GitHub Pages** work the same way.

(If you want this set up, ask your developer — it's a couple of minutes.)

### C. As a PDF (for printing or formal attachments)
Open `index.html` in your browser, then **File → Print → Save as PDF**. The page is
designed to print cleanly (menus hidden, all sections expanded).

---

## 5. Before you send it — replace every placeholder

The brochure is filled with realistic **sample** content. Replace all of it with your
real, accurate details:

- [ ] Tour **dates**, duration, ages, group size, chaperone ratio
- [ ] All **prices**, currency, deposit, early-bird, and payment deadlines
- [ ] The **refund / cancellation policy** (this is legally meaningful — use your real terms)
- [ ] Whether **flights** are included, departure airport, and meeting point
- [ ] **Contact details**: WhatsApp number, phone, email, social links
- [ ] **Testimonials** — the samples are invented. Replace them with genuine reviews you
      have permission to use. (Publishing fake reviews can be illegal.)
- [ ] **Company** name, licence number, registration number, address
- [ ] **Photos** — swap the Wikimedia placeholders for your own (or credit them per
      `docs/PHOTO-CREDITS.txt`)

---

## Rebuilding (developers only)

`index.html` (in the project root) is generated from `src/template.html` by
`src/build.py`, which fetches placeholder photos and a font. To regenerate, run from the
project root: `python3 src/build.py` (needs internet and macOS `sips`). Day-to-day editing
does **not** require this — just edit `index.html` directly.
