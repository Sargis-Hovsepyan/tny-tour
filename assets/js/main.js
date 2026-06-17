/* ============================================================
   TNY Romania Tour — main.js
   Vendor: GSAP 3.12.5 + ScrollTrigger, Lenis 1.1.13
   All effects are progressive enhancement over static HTML.
   ============================================================ */
(function(){
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RICH = !RM && typeof gsap !== 'undefined';

  if (RICH) {
    document.documentElement.classList.add('js','rich');
    gsap.registerPlugin(ScrollTrigger);
  } else {
    document.documentElement.classList.add('js');
  }

  /* ---- NAV ---- */
  const nav = $('#nav');
  const burger = $('#hamburger');
  const links = $('#navLinks');
  const burgerIcon = $('#burgerIcon');
  const closeIcon = '<path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
  const menuIcon = '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';

  function onScroll(){nav.classList.toggle('scrolled', scrollY > 60)}
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  function closeMenu(){
    links.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    burgerIcon.innerHTML = menuIcon;
  }
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burgerIcon.innerHTML = open ? closeIcon : menuIcon;
    if (open) links.querySelector('a').focus();
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
  });

  /* ---- ACTIVE NAV LINK ---- */
  if (RICH) {
    const sections = $$('section[id]');
    const navAs = $$('.nav-links a');
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec, start: 'top 40%', end: 'bottom 40%',
        onToggle: self => {
          if (self.isActive) {
            navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id));
          }
        }
      });
    });
  }

  /* ---- LENIS SMOOTH SCROLL ---- */
  if (RICH && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---- REVEALS ---- */
  if (RICH) {
    const revealEls = $$('[data-reveal]');
    if (revealEls.length) {
      ScrollTrigger.batch(revealEls, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, {y:0, opacity:1, stagger:.08, duration:.7, ease:'power3.out', overwrite:true}),
      });
      revealEls.forEach(el => gsap.set(el, {y:26, opacity:0}));
    }
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }});
    }, {threshold:.12});
    $$('[data-reveal]').forEach(n => io.observe(n));
  }

  /* ---- HERO SLIDESHOW ---- */
  const heroSlides = $$('.hero-slide');
  if (heroSlides.length > 1 && !RM) {
    let cur = 0;
    setInterval(() => {
      heroSlides[cur].classList.remove('active');
      cur = (cur + 1) % heroSlides.length;
      heroSlides[cur].classList.add('active');
    }, 5000);
  }

  /* ---- HERO PARALLAX ---- */
  if (RICH) {
    const heroSlideAll = $$('.hero-slide');
    const heroContent = $('.hero-content');
    heroSlideAll.forEach(img => {
      gsap.to(img, {
        yPercent: 18, scale: 1,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 }
      });
    });
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -30, opacity: 0,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 }
      });
    }
    const scrollInd = $('.hero-scroll');
    if (scrollInd) {
      gsap.to(scrollInd, {
        opacity: 0,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '15% top', scrub: true }
      });
    }
  }

  /* ---- SCHEDULE ITEM STAGGER ---- */
  if (RICH) {
    $$('.day-card').forEach(card => {
      const items = card.querySelectorAll('.schedule li');
      if (!items.length) return;
      gsap.set(items, { opacity: 0, x: -12 });
      ScrollTrigger.create({
        trigger: card, start: 'top 75%', once: true,
        onEnter: () => gsap.to(items, { opacity: 1, x: 0, stagger: .06, duration: .5, ease: 'power2.out' })
      });
    });
  }

  /* ---- DAY NUMBER PARALLAX ---- */
  if (RICH) {
    $$('.day-num').forEach(num => {
      gsap.to(num, {
        scale: 1.12, yPercent: -10,
        scrollTrigger: { trigger: num, start: 'top 85%', end: 'top 20%', scrub: .4 }
      });
    });
  }

  /* ---- SHOWCASE 3D PARALLAX ---- */
  if (RICH) {
    $$('.showcase-panel').forEach(panel => {
      const img = panel.querySelector('.showcase-img img');
      const txt = panel.querySelector('.showcase-text');

      if (img) {
        gsap.fromTo(img,
          { yPercent: -8, scale: 1.15 },
          { yPercent: 8, scale: 1.05,
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: .3 }
          }
        );
      }

      if (txt) {
        gsap.fromTo(txt,
          { y: 80, opacity: 0, rotateX: 4 },
          { y: 0, opacity: 1, rotateX: 0,
            scrollTrigger: { trigger: panel, start: 'top 75%', end: 'top 25%', scrub: .4 }
          }
        );
      }

      gsap.fromTo(panel,
        { clipPath: 'inset(8% 0 8% 0)' },
        { clipPath: 'inset(0% 0 0% 0)',
          scrollTrigger: { trigger: panel, start: 'top 90%', end: 'top 40%', scrub: .5 }
        }
      );
    });
  }

  /* ---- MOBILE STICKY CTA ---- */
  if (RICH) {
    const mobileCta = $('#mobileCta');
    const heroEl = $('.hero');
    const contactEl = $('#contact');
    if (mobileCta && heroEl) {
      ScrollTrigger.create({
        trigger: heroEl, start: 'bottom 80%', end: 99999,
        onEnter: () => mobileCta.classList.add('show'),
        onLeaveBack: () => mobileCta.classList.remove('show'),
      });
      if (contactEl) {
        ScrollTrigger.create({
          trigger: contactEl, start: 'top bottom',
          onEnter: () => mobileCta.classList.remove('show'),
          onLeaveBack: () => mobileCta.classList.add('show'),
        });
      }
    }
  }

  /* ---- CLIP-WIPE TEAL BANDS ---- */
  if (RICH) {
    $$('.safety, .contact').forEach(band => {
      gsap.from(band, {
        clipPath: 'inset(0 0 100% 0)',
        scrollTrigger: { trigger: band, start: 'top 80%', end: 'top 30%', scrub: .5 }
      });
    });
  }

  /* ---- COUNT-UP (price amount) ---- */
  if (RICH) {
    const amt = $('.price-amt');
    if (amt) {
      const target = 1290;
      ScrollTrigger.create({
        trigger: amt, start: 'top 80%', once: true,
        onEnter: () => {
          gsap.from({v:0}, {
            v: target, duration: 1.4, ease: 'power2.out', snap: {v:1},
            onUpdate: function(){ amt.textContent = '€' + Math.round(this.targets()[0].v).toLocaleString(); }
          });
        }
      });
    }
  }

})();
