
# Guess the Legends — QR Answer Reveal (GitHub Pages + Formspree)

This repo powers the QR codes printed in the puzzle book. Each QR connects to a single answer page. The first time a reader scans, they provide name + email (via Formspree). After that, the browser remembers them and reveals answers without asking again.

## Live site
https://globalpublishers-books.github.io/superhero-puzzle-answers/

## How it works
- `puzzle.html` is a single dynamic page addressed by a query param `?id=01..40`.
- `answers.json` holds the mapping from `id` to hero & actor.
- `app.js` fetches `answers.json`, checks for a local `gtl_user` record, and if missing:
  - shows the Formspree form,
  - submits via AJAX to `https://formspree.io/f/xrbljyyn`,
  - stores `{name,email}` in `localStorage`, then reveals the answer.
- Each QR points to `puzzle.html?id=XX` so only that answer is shown.

## Development
No build step required. Open `index.html` or `puzzle.html?id=01` in a local server (or push to GitHub Pages).

## QR code generation
