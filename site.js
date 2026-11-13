(() => {
  const header = document.querySelector('.header');
  const fv = document.querySelector('.fv');
  const onScroll = () => header.classList.toggle('is-scrolled', !fv || window.scrollY > fv.offsetHeight - header.offsetHeight);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const btn = document.querySelector('.menu-btn');
  const drawer = document.querySelector('.drawer');
  if (btn && drawer) {
    const set = (open) => {
      drawer.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      document.documentElement.classList.toggle('is-locked', open);
    };
    btn.addEventListener('click', () => set(!drawer.classList.contains('is-open')));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  document.querySelectorAll('.ttl__en').forEach((t) => t.querySelectorAll('.mask').forEach((m, i) => m.style.setProperty('--m', i)));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.classList.contains('rv')) {
        const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('rv'));
        el.style.setProperty('--rv-delay', `${sibs.indexOf(el) * 0.12}s`);
      }
      el.classList.add('is-on');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv, .ttl__en').forEach((el) => io.observe(el));

  document.querySelectorAll('form[data-todo]').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  const oval = document.querySelector('.company__oval');
  const sub = document.querySelector('.company__sub');
  if (oval && window.matchMedia('(min-width: 960px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const box = oval.parentElement;
    const move = () => {
      const r = box.getBoundingClientRect();
      const t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      oval.style.transform = `translateY(${t * -40}px) rotate(${-28 + t * 6}deg)`;
      if (sub) sub.style.transform = `translateY(${t * 60}px)`;
    };
    window.addEventListener('scroll', move, { passive: true });
    move();
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rotate = (imgs, ms, list) => {
    if (imgs.length < 2 || reduce) return;
    let i = 0;
    setInterval(() => {
      imgs[i].classList.remove('is-on'); if (list[i]) list[i].classList.remove('is-on');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('is-on'); if (list[i]) list[i].classList.add('is-on');
    }, ms);
  };
  rotate([...document.querySelectorAll('.fv__photo img')], 4500, [...document.querySelectorAll('.fv__dots li')]);
  rotate([...document.querySelectorAll('.works__photo img')], 3500, [...document.querySelectorAll('.works__list li')]);
  const box = document.querySelector('.lightbox');
  if (box) {
    const big = box.querySelector('img');
    document.querySelectorAll('.gallery__btn').forEach((b) => b.addEventListener('click', () => {
      const im = b.querySelector('img');
      big.src = im.currentSrc || im.src; big.alt = im.alt; big.width = im.width; big.height = im.height;
      box.showModal();
    }));
    box.addEventListener('click', (e) => { if (e.target === box || e.target.closest('.lightbox__close')) box.close(); });
  }
})();
