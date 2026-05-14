// Spine highlighting: mark the currently-visible chapter as current.
(function () {
  const chapters = document.querySelectorAll('.chapter');
  const items = new Map();
  for (const item of document.querySelectorAll('.spine-item')) {
    const href = item.getAttribute('href');
    if (!href || !href.startsWith('#')) continue;
    items.set(href.slice(1), item);
  }

  let lastCurrent = null;
  const setCurrent = (id) => {
    if (lastCurrent === id) return;
    if (lastCurrent && items.get(lastCurrent)) items.get(lastCurrent).classList.remove('is-current');
    if (id && items.get(id)) items.get(id).classList.add('is-current');
    lastCurrent = id;
  };

  if (!('IntersectionObserver' in window)) {
    if (chapters[0]) setCurrent(chapters[0].id);
    return;
  }

  const visible = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.set(entry.target.id, entry.intersectionRatio);
        } else {
          visible.delete(entry.target.id);
        }
      }
      let best = null;
      let bestRatio = -1;
      for (const [id, ratio] of visible) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (best) setCurrent(best);
    },
    { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  for (const c of chapters) io.observe(c);
})();
