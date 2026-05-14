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

// Catalog filter: hide rule rows + groups + sections that don't match the query.
(function () {
  const input = document.getElementById('cat-filter-input');
  if (!input) return;
  const count = document.getElementById('cat-filter-count');
  const empty = document.getElementById('cat-empty');
  const rows = Array.from(document.querySelectorAll('.rules-table tbody tr'));
  const groups = Array.from(document.querySelectorAll('.cat-group'));
  const sections = Array.from(document.querySelectorAll('.cat-section'));

  const total = rows.length;
  const haystacks = new WeakMap();
  for (const row of rows) {
    haystacks.set(row, row.textContent.toLowerCase().replace(/\s+/g, ' '));
  }

  const renderCount = (shown) => {
    if (!count) return;
    count.textContent = shown === total ? `${total} rules` : `${shown} of ${total}`;
  };

  const apply = (q) => {
    const needle = q.trim().toLowerCase();
    let shown = 0;
    for (const row of rows) {
      const match = !needle || haystacks.get(row).includes(needle);
      row.classList.toggle('is-hidden', !match);
      if (match) shown++;
    }
    for (const group of groups) {
      const any = group.querySelector('.rules-table tbody tr:not(.is-hidden)');
      group.classList.toggle('is-hidden', !any);
    }
    for (const section of sections) {
      const any = section.querySelector('.cat-group:not(.is-hidden)');
      section.classList.toggle('is-hidden', !any);
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
