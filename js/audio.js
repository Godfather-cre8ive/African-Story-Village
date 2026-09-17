/* ==========================================================================
   AFRICAN STORY VILLAGE — AUDIO LIBRARY
   --------------------------------------------------------------------------
   Renders audio story cards into any [data-render="audio-*"] carousel and
   makes sure only one <audio> element plays at a time across the page.
   Audio never autoplays; playback only starts on explicit user click.
   ========================================================================== */

function audioCard(story) {
  return `
    <article class="card card-w-md audio-card" data-audio-card role="listitem">
      <div class="card-media is-square">
        <span class="badge">${ASVRender.esc(story.seriesName)}</span>
        <img src="${ASVRender.esc(story.artwork)}" alt="Artwork for ${ASVRender.esc(story.title)}" loading="lazy">
      </div>
      <div class="card-body">
        <span class="card-meta">${ASVRender.esc(ASVRender.ageRange(story.ageMin, story.ageMax))} · ${ASVRender.esc(story.duration)}</span>
        <h4>${ASVRender.esc(story.title)}</h4>
        <div class="audio-player">
          <audio preload="none" data-audio-el>
            <source src="${ASVRender.esc(story.src)}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="card-foot">
          <a class="btn btn-ghost btn-sm btn-block" href="story.html?slug=${encodeURIComponent(story.storySlug)}">View story</a>
        </div>
      </div>
    </article>`;
}

function renderAudioMounts() {
  document.querySelectorAll('[data-render="audio-featured"], [data-render="audio-all"]').forEach((root) => {
    const type = root.getAttribute('data-render');
    const track = root.querySelector('.carousel-track') || root;
    const items = type === 'audio-featured' ? ASV_DATA.audioStories.slice(0, 4) : ASV_DATA.audioStories;
    ASVRender.mount(track, items.map(audioCard));
  });
}

function initAudioCoordination(scope) {
  const players = Array.from((scope || document).querySelectorAll('[data-audio-el]'));
  players.forEach((audio) => {
    audio.addEventListener('play', () => {
      players.forEach((other) => {
        if (other !== audio) other.pause();
      });
    });
  });
}

document.addEventListener('asv:includesReady', () => {
  renderAudioMounts();
  initAudioCoordination(document);
});
