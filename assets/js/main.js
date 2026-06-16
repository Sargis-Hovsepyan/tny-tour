/* ============================================================
   TNY Romania Tour — Cinematic Motion Engine
   GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.13
   ============================================================ */
(function(){
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_GSAP = typeof gsap !== 'undefined';

  /* ---- Lenis smooth scroll ---- */
  if (!RM && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1 });
    if (HAS_GSAP) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  } else if (HAS_GSAP) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---- Top bar scroll state ---- */
  const topbar = $('#topbar');
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', scrollY > 80);
  }, { passive: true });

  /* ---- Scroll progress bar ---- */
  if (HAS_GSAP) {
    const bar = $('#progressBar');
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top', end: 'bottom bottom',
      onUpdate: self => { bar.style.transform = `scaleX(${self.progress})`; }
    });
  }

  /* ---- Hero parallax ---- */
  if (HAS_GSAP && !RM) {
    const heroImg = $('.hero-media img');
    const heroContent = $('.hero-content');
    const hint = $('.scroll-hint');

    gsap.to(heroImg, {
      scale: 1.3, yPercent: 15,
      scrollTrigger: { trigger: '.ch-hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });
    gsap.to(heroContent, {
      yPercent: -40, opacity: 0,
      scrollTrigger: { trigger: '.ch-hero', start: 'top top', end: '60% top', scrub: 0.5 }
    });
    if (hint) {
      gsap.to(hint, {
        opacity: 0,
        scrollTrigger: { trigger: '.ch-hero', start: 'top top', end: '20% top', scrub: true }
      });
    }
  }

  /* ---- HORIZONTAL SCROLL JOURNEY ---- */
  if (HAS_GSAP && !RM) {
    const track = $('#journeyTrack');
    const panels = $$('.day-panel');
    const counter = $('.journey-counter');
    const curEl = $('#jcCur');
    const totalPanels = panels.length;

    const journeyTL = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '.ch-journey',
        pin: true,
        scrub: 0.8,
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        onUpdate: self => {
          const idx = Math.min(Math.floor(self.progress * totalPanels), totalPanels - 1);
          curEl.textContent = String(idx + 1).padStart(2, '0');
          panels.forEach((p, i) => p.classList.toggle('active', i === idx));
        },
        onEnter: () => counter.classList.add('visible'),
        onLeave: () => counter.classList.remove('visible'),
        onEnterBack: () => counter.classList.add('visible'),
        onLeaveBack: () => counter.classList.remove('visible'),
      }
    });
  } else {
    const track = $('#journeyTrack');
    if (track) {
      track.style.overflowX = 'auto';
      track.style.scrollSnapType = 'x mandatory';
      $$('.day-panel').forEach(p => { p.style.scrollSnapAlign = 'start'; p.style.flexShrink = '0'; });
    }
  }

  /* ---- Trust section reveals ---- */
  if (HAS_GSAP && !RM) {
    gsap.from('.trust-left', {
      x: -40, opacity: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: '.ch-trust', start: 'top 70%' }
    });
    gsap.from('.trust-right', {
      x: 40, opacity: 0, duration: .8, ease: 'power3.out', delay: .15,
      scrollTrigger: { trigger: '.ch-trust', start: 'top 70%' }
    });
    $$('.tg').forEach((tg, i) => {
      gsap.from(tg, {
        y: 20, opacity: 0, duration: .5, delay: i * .08, ease: 'power3.out',
        scrollTrigger: { trigger: '.trust-grid', start: 'top 80%' }
      });
    });
  }

  /* ---- Close section reveals ---- */
  if (HAS_GSAP && !RM) {
    gsap.from('.close-content', {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.ch-close', start: 'top 60%' }
    });
  }

  /* ---- Review cycling ---- */
  const revs = $$('.rev');
  const dotsContainer = $('#revDots');
  if (revs.length > 1 && dotsContainer) {
    let cur = 0;
    revs.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Review ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showRev(i));
      dotsContainer.appendChild(dot);
    });
    const dots = $$('.rev-dots button');

    function showRev(i) {
      revs[cur].classList.remove('active');
      dots[cur].classList.remove('active');
      cur = i;
      revs[cur].classList.add('active');
      dots[cur].classList.add('active');
    }

    let autoTimer = setInterval(() => showRev((cur + 1) % revs.length), 5000);
    dotsContainer.addEventListener('click', () => { clearInterval(autoTimer); });
  }

  /* ---- Info panel ---- */
  const panel = $('#infoPanel');
  const backdrop = $('#infoBackdrop');
  const openBtn = $('#infoBtn');
  const closeBtn = $('#ipClose');

  function openPanel() {
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });

})();
