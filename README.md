# yimregister.github.io

Personal academic website. Built with plain HTML, CSS, and a small amount of vanilla JavaScript. No frameworks, no build step, no dependencies. Hosted on GitHub Pages.

---

## Structure

```
index.html        — home page
research.html     — publications, awards, experience
extras.html       — art, musings
404.html          — error page
css/style.css     — all styles, including site-wide variables
js/script.js      — scroll reveal, page transitions, "currently" rotator
images/           — photos and art
assets/           — CV and dissertation PDFs
```

---

## Common edits

### Update the "currently" line

Open `js/script.js` and edit the `items` array near the top:

```js
const items = [
  'reading [your book]',
  'thinking about [your thought]',
  'enjoying [your thing]',
];
```

Each string replaces the full text after "currently:". The line rotates through them automatically.

---

### Add a publication or article

In `research.html`, copy an existing `<li>` block inside the relevant `<ul class="item-list">` and update:

- `href=""` — link to the paper or article
- `.item-title` — title text
- `.item-meta` — venue, year, authors
- `.item-desc` — one sentence description
- `.pill-row` — topic tags (optional)
- `.item-icon` — replace `<span class="item-icon-empty">` with `<img src="images/your-art.jpg" alt="">` when you have art

---

### Add art to the Extras grid

In `extras.html`, replace a placeholder `<span>` inside `.art-slot` with:

```html
<figure class="art-caption">
  <img src="images/your-drawing.jpg" alt="brief description">
  <figcaption>Caption shown on hover.</figcaption>
</figure>
```

Put the image file in the `images/` folder first.

---

### Change the accent color

Open `css/style.css`. The very first variable in `:root` controls everything:

```css
--accent: #A1CCA5;   /* ← change this one line */
```

---

### Change the art grid cell size

In the same `:root` block in `css/style.css`:

```css
--art-cell-min: 150px;  /* 150 = small · 200 = medium · 260 = large */
```

---

### Update CV or dissertation

Replace the files in `assets/`:

- `YimRegisterResume2026.pdf`
- `YimRegister_Dissertation.pdf`

Keep the filenames the same, or update every `href` that references them.

---

### Add a hover caption to the index art image

The main art image uses `<figure class="art-caption">`. Edit the `<figcaption>` text directly in `index.html`.

---

### Add a Favorites item

In `extras.html`, add a `<div class="fav-item">` inside `.fav-grid`. Size classes:

- `.fav-wide` — spans 2 columns
- `.fav-tall` — spans 2 rows
- `.fav-big` — spans 2 columns and 2 rows

Basic item:

```html
<div class="fav-item">
  <div class="fav-label">book</div>
  <div class="fav-title">Title here</div>
  <div class="fav-sub">Author or note</div>
</div>
```

Item with an image background:

```html
<div class="fav-item fav-big" style="background-image:url('images/your-file.jpg'); background-size:cover; background-position:center;">
  <div class="fav-label">art</div>
  <div class="fav-title">Caption text</div>
</div>
```

Quote item:

```html
<div class="fav-item fav-wide" style="justify-content:center; padding:1.1rem;">
  <div class="fav-quote">The quote text.</div>
  <div class="fav-sub" style="margin-top:0.6rem;">— Who said it</div>
</div>
```

Labels can be anything: `book · movie · paper · quote · art · animal · place · song`.

---

## Deployment

Push to the `main` branch. GitHub Pages deploys automatically.

```
git add .
git commit -m "update"
git push
```

---

## Notes

- All animations respect `prefers-reduced-motion`.
- No tracking, no analytics, no cookies.
- The site is fully static — nothing runs server-side.
