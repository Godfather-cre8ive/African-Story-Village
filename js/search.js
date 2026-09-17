/* ==========================================================================
   AFRICAN STORY VILLAGE — SITE SEARCH
   --------------------------------------------------------------------------
   Basic client-side search across stories, activities, audio stories and
   journal posts. Runs entirely in the browser against ASV_DATA — no
   backend required. Used by search.html; also exposes a small header
   shortcut so pressing Enter on the header search icon lands here.
   ========================================================================== */

function buildSearchIndex() {
  const index = [];
  ASV_DATA.stories.forEach((s) => index.push({
    type: 'Story', title: s.title, text: `${s.title} ${s.excerpt} ${s.description} ${s.seriesName}`,
    url: `story.html?slug=${s.slug}`, image: s.cover, meta: `${s.seriesName} · ${ASVRender.ageRange(s.ageMin, s.ageMax)}`
  }));
  ASV_DATA.activities.forEach((a) => index.push({
    type: 'Activity', title: a.title, text: `${a.title} ${a.description} ${a.category}`,
    url: 'activities.html', image: a.image, meta: `${a.category} · ${ASVRender.ageRange(a.ageMin, a.ageMax)}`
  }));
  ASV_DATA.audioStories.forEach((au) => index.push({
    type: 'Audio', title: au.title, text: `${au.title} ${au.seriesName}`,
    url: `listen.html?slug=${au.storySlug}`, image: au.artwork, meta: `${au.seriesName} · ${au.duration}`
  }));
  ASV_DATA.journalPosts.forEach((p) => index.push({
    type: 'Journal', title: p.title, text: `${p.title} ${p.excerpt} ${p.category}`,
    url: `article.html?slug=${p.slug}`, image: p.image, meta: `${p.category} · ${p.readingTime}`
  }));
  return index;
}

function resultCard(item) {
  return `
    <a class="card card-w-md" style="width:auto;text-align:left;" href="${item.url}">
      <div class="card-media">
        <span class="badge">${ASVRender.esc(item.type)}</span>
        <img src="${ASVRender.esc(item.image)}" alt="${ASVRender.esc(item.title)}" loading="lazy">
      </div>
      <div class="card-body">
        <span class="card-meta">${ASVRender.esc(item.meta)}</span>
        <h4>${ASVRender.esc(item.title)}</h4>
      </div>
    </a>`;
}

function initSiteSearch() {
  const root = document.querySelector('[data-page-search]');
  if (!root) return;

  const input = root.querySelector('#site-search-input');
  const resultsWrap = root.querySelector('#search-results');
  const emptyState = root.querySelector('#search-empty-state');
  const countEl = root.querySelector('#search-result-count');
  const index = buildSearchIndex();

  const params = new URLSearchParams(window.location.search);
  if (params.get('q')) input.value = params.get('q');

  function groupBy(items, key) {
    return items.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  }

  function run() {
    const q = input.value.trim().toLowerCase();
    resultsWrap.innerHTML = '';

    if (!q) {
      emptyState.style.display = 'block';
      emptyState.textContent = 'Start typing to search stories, activities, audio and journal articles.';
      countEl.textContent = '';
      return;
    }

    const matches = index.filter((item) => item.text.toLowerCase().includes(q));
    countEl.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} for "${q}"`;

    if (!matches.length) {
      emptyState.style.display = 'block';
      emptyState.textContent = `No matches for "${q}". Try a different word, or browse Stories, Activities, Listen or the Journal from the menu.`;
      return;
    }
    emptyState.style.display = 'none';

    const groups = groupBy(matches, 'type');
    Object.keys(groups).forEach((type) => {
      const group = document.createElement('div');
      group.className = 'search-result-group';
      group.innerHTML = `
        <h3>${ASVRender.esc(type)} <span class="search-count">(${groups[type].length})</span></h3>
        <div class="grid-3">${groups[type].map(resultCard).join('')}</div>`;
      resultsWrap.appendChild(group);
    });
  }

  input.addEventListener('input', debounce(run, 150));
  root.querySelector('#site-search-form').addEventListener('submit', (e) => e.preventDefault());
  run();
}

document.addEventListener('asv:includesReady', initSiteSearch);
