# African Story Village — Website Codebase

A production-quality, responsive, colourful children's storytelling website
built with **only HTML5, CSS3 and vanilla JavaScript** — no frameworks, no
build step.

---

## 1. Running it locally

This site loads its shared header, footer and newsletter markup with
`fetch()` (see `components/*.html` and `js/main.js`). Browsers block
`fetch()` from reading local files when a page is opened directly as
`file:///...`, so **serve the folder with a simple local server** instead
of double-clicking `index.html`:

```bash
# Option A — Python (already installed on most machines)
python3 -m http.server 5500

# Option B — Node
npx serve .
```

Then open `http://localhost:5500` (or the port `serve` gives you).

---

## 2. Folder structure

```
african-story-village/
├── index.html, about.html, stories.html, story.html, ...   ← pages
├── css/
│   ├── style.css         ← design tokens, base styles, header/footer/hero
│   ├── components.css    ← buttons, cards, carousels, forms, badges
│   └── responsive.css    ← extra breakpoint fine-tuning
├── js/
│   ├── data.js       ← ALL sample content (stories, activities, audio, journal, etc.)
│   ├── carousel.js   ← reusable horizontal-carousel controller
│   ├── main.js       ← header/footer includes, nav, theme toggle, misc
│   ├── stories.js    ← shared card renderers + stories/story/article pages
│   ├── audio.js      ← audio story cards + single-playback coordination
│   ├── search.js     ← client-side search across all content
│   └── forms.js      ← shared form validation + demo submit handling
├── components/
│   ├── header.html, footer.html, newsletter.html   ← loaded via fetch()
├── images/
│   ├── logo-placeholder.png     ← REPLACE THIS with the real logo
│   └── placeholders/            ← founder photo, partner logos, etc.
├── audio/            ← sample-story.mp3 (a placeholder tone, not narration)
├── downloads/        ← placeholder activity PDFs
└── README.md
```

---

## 3. Replacing the logo

The logo is used as an `<img>` tag everywhere (header, mobile menu,
footer) — never as CSS, an SVG recreation, or text. To replace it:

1. Search the codebase for `images/logo-placeholder.png`
   (it appears in `components/header.html`, `components/footer.html`,
   and the `<link rel="icon">` tag on every page).
2. Replace the file at `images/logo-placeholder.png` with your real
   square logo, **or** change the `src`/`href` everywhere it's referenced
   to point at a new file.
3. The logo is square and uses `object-fit: contain`, so any square PNG
   or SVG will scale correctly without distortion.

---

## 4. Replacing stock images

Every image on the site is a real `<img src="...">` tag (never a CSS
`background-image`), so you can find and replace any image by searching
for its URL or path in the HTML/`data.js`. Most images currently point to
Unsplash URLs as working placeholders. To swap one:

- For content driven by `js/data.js` (book covers, activity images, audio
  artwork, journal thumbnails, series art) — edit the `cover`, `image`,
  `artwork` fields in that one file.
- For images hard-coded into a page (hero images, About page photos) —
  edit the `src` attribute directly in that page's HTML.

---

## 5. Adding content

### Add a story/book
Open `js/data.js` and copy an object inside `ASV_DATA.stories`. Give it a
unique `slug` — that's what's used in `story.html?slug=your-slug`.

### Add an activity
Copy an object inside `ASV_DATA.activities`. Set `relatedStorySlug` to tie
it to a story, and `download` to the path of its (real) PDF once ready.

### Add an audio story
Copy an object inside `ASV_DATA.audioStories`. `src` should point to a
real `.mp3` file under `audio/`.

### Add a journal article
Copy an object inside `ASV_DATA.journalPosts`. The excerpt you write there
also appears on `article.html?slug=your-slug` — replace the placeholder
body paragraph in `article.html` with the real article text when ready
(or wire it to load per-article HTML files if the journal grows large).

### Add a new story series
Add an entry to `ASV_DATA.series` with a unique `id`, then use that `id`
as the `series` value on any story objects that belong to it. The
homepage, stories page, and filters will pick it up automatically — no
other code changes needed.

---

## 6. How the carousels work

Every horizontal carousel follows the same markup contract
(`js/carousel.js`):

```html
<div class="content-carousel" data-carousel>
  <div class="carousel-controls">
    <button class="carousel-btn carousel-prev" aria-label="Previous">…</button>
    <button class="carousel-btn carousel-next" aria-label="Next">…</button>
  </div>
  <div class="carousel-viewport">
    <div class="carousel-track" role="list" tabindex="0">
      <!-- cards go here -->
    </div>
  </div>
</div>
```

`ASVCarousel.init()` wires up every `[data-carousel]` on the page: click
arrows, keyboard arrow keys, and disables a button when you've reached
that end. Carousels also work by touch/swipe natively (CSS scroll-snap),
and desktop arrows are hidden below 900px since swiping is the primary
mobile interaction.

Many carousels are auto-populated from `data.js` using a
`data-render="..."` attribute on the `.content-carousel` wrapper (see
`js/stories.js` → `renderAutoMounts()`), so adding an item to `data.js` is
often all you need to do — no HTML edits required.

---

## 7. Connecting the forms

**No backend exists yet.** Every form (newsletter, contact, author visit,
partnership, creator submission) validates in the browser and then shows
a clearly labelled demo success message — nothing is actually sent
anywhere. The single integration point is `submitForm()` in `js/forms.js`:

```js
async function submitForm(form) {
  // TODO: replace with a real call, e.g.:
  // const res = await fetch('https://formspree.io/f/YOUR_ID', {
  //   method: 'POST',
  //   headers: { Accept: 'application/json' },
  //   body: new FormData(form)
  // });
  // return res.ok;
}
```

Swap in Formspree, Netlify Forms, EmailJS, or a custom API endpoint here
— every form on the site will start working immediately since they all
share this one function.

---

## 8. Adding Amazon / purchase links

Each story object in `js/data.js` has an `amazonUrl` field, currently set
to `"#"`. Replace it with the real Amazon (or other storefront) URL for
that title. `story.html` reads this value automatically — no HTML edits
needed.

---

## 9. Deployment

This is a static site — it deploys anywhere that serves static files:

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder, or
  connect the Git repo. No build command is needed.
- **GitHub Pages**: push to a repo and enable Pages on the `main` branch.
- **Traditional hosting**: upload the whole folder via FTP/SFTP.

Because pages load shared components via `fetch()`, make sure your host
serves the files over `http(s)://`, not `file://` — every option above
does this automatically.

---

## 10. Suggested Phase 2 backend architecture

- A real form backend (Formspree/Netlify Forms/EmailJS to start; a custom
  API + database later for schools/CRM needs).
- A lightweight CMS (e.g. a headless CMS or a simple admin panel) so
  non-developers can edit `data.js`-equivalent content without touching
  code.
- Real e-commerce or storefront integration (Shopify, Amazon KDP links,
  or a custom checkout) once book sales need to be processed directly.
- Real audio hosting/CDN for narrated audio stories.
- An account system if/when parent or classroom accounts are introduced
  (kept out of this first static version deliberately — see Section 39 of
  the original brief on child safety and privacy).
- Analytics and a real search index (e.g. Algolia) if the content library
  grows large enough that client-side search becomes slow.

---

## Notes on sample content

- All story titles, excerpts, and journal posts are **sample/demo content**
  written to demonstrate the layout — not real published titles.
- Testimonials in `js/data.js` (`ASV_DATA.testimonials`) are clearly
  commented as sample/placeholder and are not genuine endorsements.
- Partner names/logos in `js/data.js` (`ASV_DATA.partners`) are obvious
  placeholders ("Partner Placeholder One", etc.) and must be replaced with
  real, confirmed partners before publishing this page live.
- "Buy on Amazon" links use `"#"` until real storefront URLs are added.
