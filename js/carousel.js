/* ==========================================================================
   AFRICAN STORY VILLAGE — CAROUSEL SYSTEM
   --------------------------------------------------------------------------
   Initialises every element with [data-carousel] on the page.
   Markup contract:

   <section class="content-carousel" data-carousel>
     <div class="carousel-controls">
       <button class="carousel-btn carousel-prev" aria-label="Previous">...</button>
       <button class="carousel-btn carousel-next" aria-label="Next">...</button>
     </div>
     <div class="carousel-viewport">
       <div class="carousel-track" tabindex="0" role="list">
         ...cards (role="listitem")...
       </div>
     </div>
   </section>

   Cards can be static HTML or injected by another script (stories.js,
   audio.js, etc.) BEFORE ASVCarousel.init() runs, or ASVCarousel.refresh()
   can be called again after dynamic content changes.
   ========================================================================== */

const ASVCarousel = (function () {
  function scrollAmount(track) {
    const firstCard = track.querySelector(':scope > *');
    if (!firstCard) return track.clientWidth * 0.8;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '16');
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateButtons(root, track) {
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    if (!prevBtn && !nextBtn) return;
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll;
  }

  function wireCarousel(root) {
    if (root.dataset.carouselReady === 'true') return;
    const track = root.querySelector('.carousel-track');
    if (!track) return;
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');

    const go = (dir) => {
      track.scrollBy({ left: dir * scrollAmount(track) * 1.02, behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => go(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => go(1));

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
    });

    let ticking = false;
    track.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateButtons(root, track);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => updateButtons(root, track));

    updateButtons(root, track);
    root.dataset.carouselReady = 'true';
  }

  function init(scope) {
    const roots = (scope || document).querySelectorAll('[data-carousel]');
    roots.forEach(wireCarousel);
  }

  function refresh(root) {
    const track = root.querySelector('.carousel-track');
    if (track) updateButtons(root, track);
  }

  return { init, refresh };
})();

document.addEventListener('DOMContentLoaded', () => ASVCarousel.init());
