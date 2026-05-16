// Inject in-body tether refs before each sidenote. CSS counts via .sn-ref.
(function () {
  for (const note of document.querySelectorAll('.sidenote')) {
    const prev = note.previousElementSibling;
    if (prev && prev.classList && prev.classList.contains('sn-ref')) continue;
    const ref = document.createElement('sup');
    ref.className = 'sn-ref';
    ref.setAttribute('aria-hidden', 'true');
    note.parentNode.insertBefore(ref, note);
  }
})();

// Spine highlighting: mark the currently-visible chapter or cat-group as current.
(function () {
  const sections = document.querySelectorAll('.chapter, .cat-group, .cat-section');
  const items = new Map();
  for (const link of document.querySelectorAll('.spine-item, .spine-sub a')) {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) continue;
    items.set(href.slice(1), link);
  }

  let lastCurrent = null;
  const setCurrent = (id) => {
    if (lastCurrent === id) return;
    if (lastCurrent && items.get(lastCurrent)) items.get(lastCurrent).classList.remove('is-current');
    if (id && items.get(id)) items.get(id).classList.add('is-current');
    lastCurrent = id;
  };

  if (!('IntersectionObserver' in window)) {
    if (sections[0]) setCurrent(sections[0].id);
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
        if (!items.has(id)) continue;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (best) setCurrent(best);
    },
    { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  for (const s of sections) {
    if (s.id) io.observe(s);
  }
})();

// Catalog filter: hide units (rule rows or genre leaves) + groups + sections that don't match.
(function () {
  const input = document.getElementById('cat-filter-input');
  if (!input) return;
  const count = document.getElementById('cat-filter-count');
  const empty = document.getElementById('cat-empty');

  // Two unit types share the filter: .rules-table tbody tr (catalog page) and .genre-leaf (genres page).
  const leafUnits = Array.from(document.querySelectorAll('.genre-leaf'));
  const rowUnits = Array.from(document.querySelectorAll('.rules-table tbody tr'));
  const units = leafUnits.length > 0 ? leafUnits : rowUnits;
  const unitNoun = leafUnits.length > 0 ? 'genres' : 'rules';

  const groups = Array.from(document.querySelectorAll('.cat-group'));
  const sections = Array.from(document.querySelectorAll('.cat-section'));
  const families = Array.from(document.querySelectorAll('.genre-family'));

  const total = units.length;
  const haystacks = new WeakMap();
  for (const u of units) {
    haystacks.set(u, u.textContent.toLowerCase().replace(/\s+/g, ' '));
  }

  const renderCount = (shown) => {
    if (!count) return;
    count.textContent = shown === total ? `${total} ${unitNoun}` : `${shown} of ${total}`;
  };

  const apply = (q) => {
    const needle = q.trim().toLowerCase();
    let shown = 0;
    for (const u of units) {
      const match = !needle || haystacks.get(u).includes(needle);
      u.classList.toggle('is-hidden', !match);
      if (match) shown++;
    }
    for (const group of groups) {
      const any = group.querySelector('.rules-table tbody tr:not(.is-hidden)');
      group.classList.toggle('is-hidden', !any);
    }
    // Hide an entire family if none of its leaves match.
    for (const fam of families) {
      const any = fam.querySelector('.genre-leaf:not(.is-hidden)');
      fam.classList.toggle('is-hidden', !any);
    }
    for (const section of sections) {
      const hasGroup = section.querySelector('.cat-group:not(.is-hidden)');
      const hasLeaf = section.querySelector('.genre-leaf:not(.is-hidden)');
      // Always show the "how-it-works" / non-listing sections; only hide listing sections.
      const isListing = section.classList.contains('cat-group') || section.querySelector('.cat-group, .genre-leaf');
      if (!isListing) continue;
      section.classList.toggle('is-hidden', !(hasGroup || hasLeaf));
    }
    if (empty) empty.hidden = shown !== 0;
    renderCount(shown);
  };

  renderCount(total);

  input.addEventListener('input', () => apply(input.value));

  // Keyboard affordances: / focuses, Escape clears + blurs.
  document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      const active = document.activeElement;
      const tag = active && active.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (active && active.isContentEditable)) return;
      e.preventDefault();
      input.focus();
      input.select();
    } else if (e.key === 'Escape' && document.activeElement === input) {
      if (input.value) {
        input.value = '';
        apply('');
      } else {
        input.blur();
      }
    }
  });

  const initial = new URLSearchParams(location.search).get('q');
  if (initial) {
    input.value = initial;
    apply(initial);
  }
})();
