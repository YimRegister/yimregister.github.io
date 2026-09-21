/* =====================================================================
   Shared UX script
   - "Currently" rotating cross-fade
   - Art image fade-in on load
   - Scroll reveal (data-reveal)
   - Page fade transition on internal links
===================================================================== */

/* ------------------------------------------------------------------
   1. "Currently" rotator — edit the items array to change what shows.
   Each string is the full value after "currently: "
------------------------------------------------------------------ */
(function () {
  const el = document.getElementById('currently-value');
  if (!el) return;

  // ── EDIT THESE ──────────────────────────────────────────────────
  const items = [
    'reading "I, Robot"',
    'thinking about agentic AI safety',
    'enjoying scary movies',
    'contributing to Wikipedia'
  ];
  // ────────────────────────────────────────────────────────────────

  const dur = parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--currently-fade')
  ) * 1000 || 400;

  let i = 0;
  el.textContent = items[0];

  setInterval(() => {
    i = (i + 1) % items.length;
    el.classList.add('c-leaving');
    setTimeout(() => {
      el.textContent = items[i];
      el.classList.remove('c-leaving');
      el.classList.add('c-entering');
      setTimeout(() => el.classList.remove('c-entering'), dur);
    }, dur);
  }, 3500);
})();

/* ------------------------------------------------------------------
   2. Art image fade-in
   Any <img class="art-fade"> fades in once loaded.
------------------------------------------------------------------ */
document.querySelectorAll('img.art-fade').forEach((img) => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});

/* ------------------------------------------------------------------
   3. Scroll reveal
   Add data-reveal to any element to fade it up on scroll.
   Siblings with data-reveal inside the same parent get staggered.
------------------------------------------------------------------ */
(function () {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  targets.forEach((el) => {
    el.classList.add('reveal');
    const siblings = [...el.parentElement.querySelectorAll('[data-reveal]')];
    el.style.setProperty('--reveal-i', siblings.indexOf(el));
  });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ------------------------------------------------------------------
   4. Page fade transition
   Fades out body before navigating to internal links.
------------------------------------------------------------------ */
(function () {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (link.target === '_blank') return;
    if (href.startsWith('#') || href.startsWith('mailto')) return;
    if (link.hostname && link.hostname !== location.hostname) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');

    const dur = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--page-transition')
    ) * 1000 || 220;

    setTimeout(() => { location.href = href; }, dur);
  });
})();

/* ------------------------------------------------------------------
   5. Art grid lightbox
   Clicking any .art-slot img opens a full-screen overlay.
   Close by clicking the backdrop, the × button, or pressing Escape.
------------------------------------------------------------------ */
(function () {
  // Build overlay DOM once
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.innerHTML = `
    <button class="lb-close" aria-label="Close image viewer">&#x2715;</button>
    <img class="lb-img" src="" alt="">
  `;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lb-img');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.lb-close').focus();
  }

  function close() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // Attach click to every .art-slot that contains an img
  document.querySelectorAll('.art-slot').forEach((slot) => {
    const img = slot.querySelector('img');
    if (!img) return;
    slot.style.cursor = 'zoom-in';
    slot.addEventListener('click', () => open(img.src, img.alt));
  });

  // Close on backdrop click (not on the image itself)
  overlay.addEventListener('click', (e) => {
    if (e.target !== lbImg) close();
  });

  // Close button
  overlay.querySelector('.lb-close').addEventListener('click', close);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('lb-open')) close();
  });
})();
