/* ==========================================================================
   AFRICAN STORY VILLAGE — STORIES / CARD RENDERING
   --------------------------------------------------------------------------
   Two responsibilities:
   1. A small shared render library (ASVRender) used by every page to turn
      ASV_DATA records into card HTML — so every carousel on the site
      (homepage, stories.html, activities.html, listen.html, journal.html)
      draws from the same markup instead of duplicating card templates.
   2. Page-specific logic for stories.html (filtering) and story.html
      (detail rendering), which only run when their containers exist.
   ========================================================================== */

const ASVRender = (function () {
  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function seriesLabel(id) {
    const s = (window.ASV_DATA.series || []).find((x) => x.id === id);
    return s ? s.shortName : id;
  }

  function ageRange(min, max) {
    return `Ages ${min}–${max}`;
  }

  function storyCard(story) {
    return `
      <article class="card card-w-md" data-series="${esc(story.series)}" role="listitem">
        <div class="card-media is-portrait">
          <span class="badge">${esc(seriesLabel(story.series))}</span>
          <img src="${esc(story.cover)}" alt="Cover of ${esc(story.title)}" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-meta">${esc(ageRange(story.ageMin, story.ageMax))} · ${esc(story.readingTime)}</span>
          <h3>${esc(story.title)}</h3>
          <p class="card-desc">${esc(story.excerpt)}</p>
          <div class="card-foot">
            <a class="btn btn-outline btn-sm btn-block" href="story.html?slug=${encodeURIComponent(story.slug)}">View story</a>
          </div>
        </div>
      </article>`;
  }

  function seriesCard(series) {
    return `
      <article class="series-card card-w-lg" style="width:320px;" role="listitem">
        <img src="${esc(series.image)}" alt="${esc(series.name)} artwork" loading="lazy">
        <div class="series-content">
          <span class="badge">${esc(ageRange(series.ageMin, series.ageMax))}${series.comingSoon ? ' · Coming soon' : ''}</span>
          <h3>${esc(series.name)}</h3>
          <p>${esc(series.description)}</p>
          <a class="btn btn-light btn-sm" href="stories.html?series=${encodeURIComponent(series.id)}">Explore series</a>
        </div>
      </article>`;
  }

  function activityCard(activity) {
    return `
      <article class="card card-w-md activity-card" data-cat="${esc(activity.category)}" role="listitem">
        <div class="card-media">
          <span class="badge">${esc(activity.category)}</span>
          <img src="${esc(activity.image)}" alt="${esc(activity.title)} activity illustration" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-meta">${esc(ageRange(activity.ageMin, activity.ageMax))}</span>
          <h4>${esc(activity.title)}</h4>
          <p class="card-desc">${esc(activity.description)}</p>
          <div class="card-foot">
            <a class="btn btn-primary btn-sm btn-block" href="${esc(activity.download)}" download>Download activity</a>
          </div>
        </div>
      </article>`;
  }

  function journalCard(post) {
    return `
      <article class="card card-w-md journal-card" role="listitem">
        <div class="card-media">
          <span class="badge">${esc(post.category)}</span>
          <img src="${esc(post.image)}" alt="${esc(post.title)}" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-meta">${esc(post.readingTime)}</span>
          <h4>${esc(post.title)}</h4>
          <p class="card-desc">${esc(post.excerpt)}</p>
          <div class="card-foot">
            <a class="btn btn-outline btn-sm btn-block" href="article.html?slug=${encodeURIComponent(post.slug)}">Read article</a>
          </div>
        </div>
      </article>`;
  }

  function testimonialCard(t) {
    return `
      <article class="card card-w-md testimonial-card" role="listitem">
        <p class="testimonial-quote">&ldquo;${esc(t.quote)}&rdquo;</p>
        <div class="testimonial-person">
          <img src="${esc(t.avatar)}" alt="" loading="lazy">
          <div>
            <strong>${esc(t.name)}</strong>
            <span>${esc(t.role)}</span>
          </div>
        </div>
      </article>`;
  }

  function partnerCard(p) {
    return `
      <div class="partner-card card-w-sm" role="listitem">
        <img src="${esc(p.logo)}" alt="${esc(p.name)} logo placeholder" loading="lazy">
      </div>`;
  }

  function programmeCard(p) {
    return `
      <article class="card card-w-md" role="listitem">
        <div class="card-media">
          <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-meta">${esc(p.audience)}</span>
          <h4>${esc(p.name)}</h4>
          <p class="card-desc">${esc(p.description)}</p>
          <div class="card-foot">
            <a class="btn btn-outline btn-sm btn-block" href="contact.html?type=school">Enquire</a>
          </div>
        </div>
      </article>`;
  }

  function pillarCard(p) {
    return `
      <article class="card card-w-md value-card" role="listitem">
        <div class="value-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.6 6.2L21 9l-5 4.4L17.4 20 12 16.6 6.6 20 8 13.4 3 9l6.4-.8z"/></svg>
        </div>
        <h4>${esc(p.title)}</h4>
        <p class="card-desc">${esc(p.copy)}</p>
      </article>`;
  }

  function mount(track, html) {
    if (track) track.innerHTML = html.join('');
  }

  return {
    esc, seriesLabel, ageRange,
    storyCard, seriesCard, activityCard, journalCard,
    testimonialCard, partnerCard, programmeCard, pillarCard,
    mount
  };
})();

/* ------------------------------------------------------------------ */
/* Generic [data-render] auto-mount: used on homepage and other pages  */
/* to populate carousels straight from ASV_DATA without repeating      */
/* per-page rendering code.                                            */
/* ------------------------------------------------------------------ */
function renderAutoMounts() {
  document.querySelectorAll('[data-render]').forEach((root) => {
    const type = root.getAttribute('data-render');
    const track = root.querySelector('.carousel-track') || root;
    let items = [];
    let html = [];

    switch (type) {
      case 'series':
        items = ASV_DATA.series;
        html = items.map(ASVRender.seriesCard);
        break;
      case 'stories-featured':
        items = ASV_DATA.stories.filter((s) => s.featured);
        html = items.map(ASVRender.storyCard);
        break;
      case 'stories-all':
        items = ASV_DATA.stories;
        html = items.map(ASVRender.storyCard);
        break;
      case 'activities-featured':
        items = ASV_DATA.activities.filter((a) => a.featured);
        html = items.map(ASVRender.activityCard);
        break;
      case 'activities-all':
        items = ASV_DATA.activities;
        html = items.map(ASVRender.activityCard);
        break;
      case 'journal-featured':
        items = ASV_DATA.journalPosts.filter((p) => p.featured);
        html = items.map(ASVRender.journalCard);
        break;
      case 'journal-all':
        items = ASV_DATA.journalPosts;
        html = items.map(ASVRender.journalCard);
        break;
      case 'testimonials':
        items = ASV_DATA.testimonials;
        html = items.map(ASVRender.testimonialCard);
        break;
      case 'partners':
        items = ASV_DATA.partners;
        html = items.map(ASVRender.partnerCard);
        break;
      case 'programmes':
        items = ASV_DATA.readingProgrammes;
        html = items.map(ASVRender.programmeCard);
        break;
      case 'pillars':
        items = ASV_DATA.pillars;
        html = items.map(ASVRender.pillarCard);
        break;
      default:
        return;
    }
    ASVRender.mount(track, html);
  });
}

/* ------------------------------------------------------------------ */
/* stories.html — filterable story library                             */
/* ------------------------------------------------------------------ */
function initStoryLibrary() {
  const page = document.querySelector('[data-page-stories]');
  if (!page) return;

  const params = new URLSearchParams(window.location.search);
  const seriesSelect = page.querySelector('#filter-series');
  const ageSelect = page.querySelector('#filter-age');
  const focusSelect = page.querySelector('#filter-focus');
  const searchInput = page.querySelector('#filter-search');
  const resultsWrap = page.querySelector('#story-results');
  const emptyState = page.querySelector('#story-empty');

  if (params.get('series')) seriesSelect.value = params.get('series');

  function ageMatch(story, ageBucket) {
    if (!ageBucket) return true;
    const [min, max] = ageBucket.split('-').map(Number);
    return story.ageMin <= max && story.ageMax >= min;
  }

  function render() {
    const seriesVal = seriesSelect.value;
    const ageVal = ageSelect.value;
    const focusVal = focusSelect.value;
    const searchVal = searchInput.value.trim().toLowerCase();

    const bySeries = {};
    ASV_DATA.series.forEach((s) => { bySeries[s.id] = []; });

    ASV_DATA.stories.forEach((story) => {
      if (seriesVal && story.series !== seriesVal) return;
      if (!ageMatch(story, ageVal)) return;
      if (focusVal && !story.learningFocus.includes(focusVal)) return;
      if (searchVal && !(`${story.title} ${story.excerpt}`.toLowerCase().includes(searchVal))) return;
      if (bySeries[story.series]) bySeries[story.series].push(story);
    });

    resultsWrap.innerHTML = '';
    let totalResults = 0;

    ASV_DATA.series.forEach((series) => {
      const list = bySeries[series.id];
      if (!list || !list.length) return;
      totalResults += list.length;

      const section = document.createElement('div');
      section.className = 'story-group';
      section.innerHTML = `
        <div class="section-head">
          <div>
            <h3>${ASVRender.esc(series.name)}</h3>
            <p class="card-meta">${list.length} ${list.length === 1 ? 'story' : 'stories'}</p>
          </div>
        </div>
        <div class="content-carousel" data-carousel>
          <div class="carousel-controls">
            <button class="carousel-btn carousel-prev" aria-label="Previous"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15l-5-5 5-5"/></svg></button>
            <button class="carousel-btn carousel-next" aria-label="Next"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 15l5-5-5-5"/></svg></button>
          </div>
          <div class="carousel-viewport">
            <div class="carousel-track" role="list" tabindex="0">
              ${list.map(ASVRender.storyCard).join('')}
            </div>
          </div>
        </div>`;
      resultsWrap.appendChild(section);
    });

    emptyState.style.display = totalResults ? 'none' : 'block';
    ASVCarousel.init(resultsWrap);
  }

  [seriesSelect, ageSelect, focusSelect].forEach((el) => el.addEventListener('change', render));
  searchInput.addEventListener('input', debounce(render, 200));
  render();
}

/* ------------------------------------------------------------------ */
/* story.html — single story detail page                               */
/* ------------------------------------------------------------------ */
function initStoryDetail() {
  const root = document.querySelector('[data-page-story-detail]');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const story = ASV_DATA.stories.find((s) => s.slug === slug) || ASV_DATA.stories[0];
  if (!story) return;

  document.title = `${story.title} — African Story Village`;

  root.querySelector('[data-story-cover]').src = story.cover;
  root.querySelector('[data-story-cover]').alt = `Cover of ${story.title}`;
  root.querySelector('[data-story-title]').textContent = story.title;
  root.querySelector('[data-story-series]').textContent = story.seriesName;
  root.querySelector('[data-story-series]').href = `stories.html?series=${story.series}`;
  root.querySelector('[data-story-age]').textContent = ASVRender.ageRange(story.ageMin, story.ageMax);
  root.querySelector('[data-story-time]').textContent = story.readingTime;
  root.querySelector('[data-story-author]').textContent = story.author;
  root.querySelector('[data-story-illustrator]').textContent = story.illustrator;
  root.querySelector('[data-story-description]').textContent = story.description;

  const themesWrap = root.querySelector('[data-story-themes]');
  themesWrap.innerHTML = story.learningFocus.concat(story.moralThemes).map((t) => `<span class="tag">${ASVRender.esc(t)}</span>`).join('');

  const amazonBtn = root.querySelector('[data-story-amazon]');
  amazonBtn.href = story.amazonUrl;

  const listenBtn = root.querySelector('[data-story-listen]');
  if (story.audioAvailable) {
    listenBtn.href = `listen.html?slug=${story.slug}`;
  } else {
    listenBtn.remove();
  }

  const activityBtn = root.querySelector('[data-story-activity]');
  const relatedActivity = ASV_DATA.activities.find((a) => a.relatedStorySlug === story.slug);
  if (story.activityAvailable && relatedActivity) {
    activityBtn.href = relatedActivity.download;
  } else {
    activityBtn.remove();
  }

  /* Discover / Inside sections use the story's own themes copy */
  const discoverList = root.querySelector('[data-story-discover]');
  discoverList.innerHTML = story.learningFocus.map((f) => `<li>${ASVRender.esc(f)} skills, built through the story's own puzzles and choices.</li>`).join('');

  const insideList = root.querySelector('[data-story-inside]');
  insideList.innerHTML = story.moralThemes.map((m) => `<li>A moment built around ${ASVRender.esc(m).toLowerCase()}.</li>`).join('');

  /* Related activities for this story */
  const relatedActivities = ASV_DATA.activities.filter((a) => a.relatedStorySlug === story.slug);
  const activityTrack = root.querySelector('[data-story-related-activities] .carousel-track');
  if (activityTrack) {
    ASVRender.mount(activityTrack, relatedActivities.length ? relatedActivities.map(ASVRender.activityCard) : [ASV_DATA.activities[0]].map(ASVRender.activityCard));
  }

  /* More from this series */
  const moreFromSeries = ASV_DATA.stories.filter((s) => s.series === story.series && s.slug !== story.slug);
  const moreTrack = root.querySelector('[data-story-more-series] .carousel-track');
  if (moreTrack) ASVRender.mount(moreTrack, moreFromSeries.map(ASVRender.storyCard));

  ASVCarousel.init(root);
}

/* ------------------------------------------------------------------ */
/* article.html — single journal article template                     */
/* ------------------------------------------------------------------ */
function initArticleDetail() {
  const root = document.querySelector('[data-page-article]');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const post = ASV_DATA.journalPosts.find((p) => p.slug === slug) || ASV_DATA.journalPosts[0];
  if (!post) return;

  document.title = `${post.title} — The Village Journal`;
  root.querySelector('[data-article-image]').src = post.image;
  root.querySelector('[data-article-image]').alt = post.title;
  root.querySelector('[data-article-category]').textContent = post.category;
  root.querySelector('[data-article-title]').textContent = post.title;
  root.querySelector('[data-article-time]').textContent = post.readingTime;
  root.querySelector('[data-article-excerpt]').textContent = post.excerpt;

  const related = ASV_DATA.journalPosts.filter((p) => p.slug !== post.slug).slice(0, 6);
  const track = root.querySelector('[data-article-related] .carousel-track');
  if (track) ASVRender.mount(track, related.map(ASVRender.journalCard));
  ASVCarousel.init(root);
}

function debounce(fn, delay) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}

document.addEventListener('asv:includesReady', () => {
  renderAutoMounts();
  initStoryLibrary();
  initStoryDetail();
  initArticleDetail();
});
