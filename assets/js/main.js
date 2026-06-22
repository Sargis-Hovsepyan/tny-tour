/* ============================================================
   TNY Romania Tour - main.js
   Vendor: GSAP 3.12.5 + ScrollTrigger, Lenis 1.1.13
   All effects are progressive enhancement over static HTML.
   ============================================================ */
(function(){
  'use strict';

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

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
  const overlay = $('#navOverlay');
  const closeIcon = '<path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
  const menuIcon = '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';

  function onScroll(){nav.classList.toggle('scrolled', scrollY > 60)}
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  function closeMenu(returnFocus){
    links.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded','false');
    burgerIcon.innerHTML = menuIcon;
    burger.setAttribute('aria-label','Menu');
    if (returnFocus) burger.focus();
  }
  function openMenu(){
    links.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded','true');
    burgerIcon.innerHTML = closeIcon;
    burger.setAttribute('aria-label','Close menu');
    links.querySelector('a').focus();
  }
  burger.addEventListener('click', () => {
    links.classList.contains('open') ? closeMenu(true) : openMenu();
  });
  if (overlay) overlay.addEventListener('click', () => closeMenu(true));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', e => {
    if (!links.classList.contains('open')) return;
    if (e.key === 'Escape') { closeMenu(true); return; }
    if (e.key === 'Tab') {
      // focus trap: cycle within hamburger + drawer links
      const f = [burger, ...links.querySelectorAll('a')];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
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
  let lenisRef = null;
  if (RICH && typeof Lenis !== 'undefined') {
    lenisRef = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenisRef.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window._lenis = lenisRef;
  }

  /* ---- KEEP SCROLLTRIGGER POSITIONS IN SYNC ----
     Web-font swap and lazy-loaded images shift layout after triggers
     are built, so recompute once everything has settled. */
  if (RICH) {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
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

  /* ---- HERO VIDEO: native HTML5, pre-cropped clip, 1.5x speed, native loop ---- */
  const heroVid = $('video.hero-video');
  if (heroVid) {
    heroVid.playbackRate = 1.5;
    // some browsers need an explicit play() after a muted autoplay element mounts
    const p = heroVid.play();
    if (p && p.catch) p.catch(() => {});
  }

  /* ---- HERO PARALLAX ---- */
  if (RICH) {
    const heroContent = $('.hero-content');
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

  /* ---- DESTINATION GALLERY MODAL ----
     Click a destination panel to open a gallery of that place's photos + info.
     All photos are pre-standardised to 3:2, so the stage never distorts them. */
  const IMG = 'assets/img/';
  const DESTS = {
    bucharest: {
      day: 'Days 1–2 & 5–8', title: 'Bucharest',
      desc: "Romania's capital and your base for five of the eight nights. Belle Époque boulevards once earned it the nickname “Little Paris”; today grand institutions sit beside a lively, café-filled Old Town.",
      highlights: ['Guided city tour with a licensed guide', 'The Romanian Athenaeum & Revolution Square', 'Cișmigiu Garden in the city centre', 'National Art Gallery & Cărturești Carusel'],
      images: [
        { src: 'bucharest-aerial-panorama.jpg', cap: 'The skyline at dusk' },
        { src: 'bucharest-romanian-athenaeum.jpg', cap: 'The Romanian Athenaeum' },
        { src: 'bucharest-arcul-de-triumf.jpg', cap: 'Arcul de Triumf' },
        { src: 'bucharest-cismigiu-garden.jpg', cap: 'Cișmigiu Garden' },
        { src: 'bucharest-university-library.jpg', cap: 'Central University Library' }
      ]
    },
    slanic: {
      day: 'Day 3', title: 'Slanic Salt Mine',
      desc: 'An immense salt mine more than 200 metres underground, on the road from Bucharest to Brașov. Vast cathedral-like chambers carved from rock salt, with a planetarium, sculptures, an illuminated lake and famously pure air.',
      highlights: ['Cathedral-sized salt chambers', 'An underground planetarium', 'Salt sculptures & an illuminated lake', 'Famously pure, salty air'],
      images: [
        { src: 'slanic-salt-mine-main-hall.jpg', cap: 'The main underground hall' },
        { src: 'slanic-salt-mine-planetarium.jpg', cap: 'The planetarium dome' },
        { src: 'slanic-salt-mine-sculptures.jpg', cap: 'Salt sculptures' },
        { src: 'slanic-salt-mine-illuminated.jpg', cap: 'The illuminated lake' },
        { src: 'slanic-salt-mine-chamber.jpg', cap: 'The vertical shaft' },
        { src: 'slanic-salt-mine-tunnel.jpg', cap: 'Walkways deep underground' }
      ]
    },
    brasov: {
      day: 'Days 3–5', title: 'Brașov',
      desc: "A medieval Saxon town at the foot of Tâmpa mountain, and your base for two nights in Transylvania. Pastel merchant houses, Gothic spires and one of Europe's liveliest pedestrian streets.",
      highlights: ['Council Square (Piața Sfatului)', 'The Gothic Black Church', 'The Strada Republicii promenade', 'Mountain views from Tâmpa'],
      images: [
        { src: 'brasov-council-square-aerial.jpg', cap: 'Council Square from above' },
        { src: 'brasov-council-square-facades.jpg', cap: 'Pastel merchant facades' },
        { src: 'brasov-strada-republicii.jpg', cap: 'Strada Republicii' },
        { src: 'brasov-black-church.jpg', cap: 'The Black Church' },
        { src: 'brasov-black-church-sunset.jpg', cap: 'The Black Church at sunset' },
        { src: 'brasov-tampa-mountain.jpg', cap: 'Tampa mountain and the BRASOV sign' },
        { src: 'brasov-rooftops-panorama.jpg', cap: 'Red rooftops below the hills' },
        { src: 'brasov-old-town-cobblestones.jpg', cap: 'Cobbled old-town lanes' },
        { src: 'brasov-old-town-winter.jpg', cap: 'The old town in winter' }
      ]
    },
    peles: {
      day: 'Day 5', title: 'Peleș Castle',
      desc: "Romania's fairy-tale royal palace, built for King Carol I in the Carpathian forests above Sinaia. A Neo-Renaissance masterpiece of carved wood, stained glass and more than 160 rooms.",
      highlights: ['Guided tour of the state rooms', 'Built for King Carol I, 1873–1914', 'Among the first castles with its own electricity', 'The forests and town of Sinaia'],
      images: [
        { src: 'peles-wide.jpg', cap: 'Peleș Castle, Sinaia' },
        { src: 'peles-castle-hilltop.jpg', cap: 'The castle from the hillside' },
        { src: 'peles-aerial-forest.jpg', cap: 'Aerial view amid the Carpathian forest' },
        { src: 'peles-castle-towers.jpg', cap: 'The Neo-Renaissance towers' },
        { src: 'peles-autumn-view.jpg', cap: 'Peleș in early autumn' },
        { src: 'peles-garden-path.jpg', cap: 'The castle from the garden' }
      ]
    },
    bran: {
      day: 'Day 4', title: 'Bran Castle',
      desc: "The cliff-top fortress known the world over as “Dracula’s Castle.” The legend of Bram Stoker’s count meets the real history of Vlad Țepeș and Queen Marie, perched between Transylvania and Wallachia.",
      highlights: ['Guided tour of the castle', 'The Dracula legend & the real history', 'Once Queen Marie’s residence', 'Râșnov Fortress the same day'],
      images: [
        { src: 'bran-wide.jpg', cap: 'Bran Castle on its cliff' },
        { src: 'bran-castle-front.jpg', cap: 'The castle from below' },
        { src: 'bran-castle-approach.jpg', cap: 'Bran Castle at dusk' },
        { src: 'bran-castle-tower.jpg', cap: 'Drone view of the tower' },
        { src: 'bran-castle-courtyard.jpg', cap: 'Inside the courtyard' },
        { src: 'bran-castle-walls.jpg', cap: 'The castle in clear sky' }
      ]
    },
    parliament: {
      day: 'Day 6', title: 'Palace of the Parliament',
      desc: 'The heaviest building on earth and one of the largest, with over 1,000 rooms of marble, crystal and carved wood. A guided tour reveals a fraction of its staggering scale.',
      highlights: ['Guided tour of the interior', 'Marble halls & crystal chandeliers', 'Around 1,100 rooms', 'Sweeping views from the terrace'],
      images: [
        { src: 'bucharest-parliament-wide.jpg', cap: 'The Palace of the Parliament' },
        { src: 'bucharest-parliament-close.jpg', cap: 'Detail of the facade' },
        { src: 'parliament-wide.jpg', cap: 'Unirii Boulevard from the Parliament terrace' },
        { src: 'parliament-boulevard.jpg', cap: 'The Parliament from the boulevard' },
        { src: 'parliament-night.jpg', cap: 'Unirii fountain and the Palace' }
      ]
    },
    oldtown: {
      day: 'Day 7', title: 'Bucharest Old Town',
      desc: "Bucharest's historic Lipscani quarter: cobblestone lanes of cafés, bookshops and 19th-century arcades, crowned by the ornate dome of the CEC Palace. The setting for the farewell dinner walk.",
      highlights: ['Strada Covaci & the Lipscani lanes', 'The ornate CEC Palace', 'Cafés and the farewell dinner', 'The Old Town after dark'],
      images: [
        { src: 'bucharest-old-town-cec-dusk.jpg', cap: 'The CEC Palace dome at dusk' },
        { src: 'bucharest-strada-covaci.jpg', cap: 'Strada Covaci' },
        { src: 'bucharest-old-town-street.jpg', cap: 'Old-town cafés' },
        { src: 'bucharest-cec-palace.jpg', cap: 'The CEC Palace' },
        { src: 'bucharest-old-town-walk.jpg', cap: 'The CEC dome from the lanes' },
        { src: 'bucharest-old-town-night.jpg', cap: 'Evening on the cobblestones' }
      ]
    }
  };

  const modal = $('#destModal');
  if (modal) {
    const dialog = modal.querySelector('.dest-dialog');
    const elImg = $('#destImg'), elCap = $('#destCaption'), elCount = $('#destCount');
    const elThumbs = $('#destThumbs'), elDay = $('#destDay'), elTitle = $('#destTitle');
    const elDesc = $('#destDesc'), elHi = $('#destHighlights');
    const btnClose = $('#destClose'), btnPrev = $('#destPrev'), btnNext = $('#destNext');
    let cur = null, idx = 0, lastFocus = null, closeTimer = null;

    function render() {
      const im = cur.images[idx];
      elImg.src = IMG + im.src;
      elImg.alt = cur.title + ': ' + im.cap;
      elCap.textContent = im.cap;
      const multi = cur.images.length > 1;
      elCount.textContent = multi ? (idx + 1) + ' / ' + cur.images.length : '';
      btnPrev.style.display = btnNext.style.display = multi ? '' : 'none';
      [...elThumbs.children].forEach((t, i) => t.setAttribute('aria-pressed', String(i === idx)));
      const active = elThumbs.children[idx];
      if (active) active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    function go(d) { idx = (idx + d + cur.images.length) % cur.images.length; render(); }

    function build(dest) {
      cur = DESTS[dest]; if (!cur) return false;
      idx = 0;
      elDay.textContent = cur.day;
      elTitle.textContent = cur.title;
      elDesc.textContent = cur.desc;
      elHi.innerHTML = '';
      cur.highlights.forEach(h => { const li = document.createElement('li'); li.textContent = h; elHi.appendChild(li); });
      elThumbs.innerHTML = '';
      elThumbs.style.display = cur.images.length > 1 ? '' : 'none';
      cur.images.forEach((im, i) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'dg-thumb';
        b.setAttribute('aria-label', 'Photo ' + (i + 1) + ': ' + im.cap);
        b.setAttribute('aria-pressed', String(i === 0));
        const img = document.createElement('img');
        img.src = IMG + im.src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
        b.appendChild(img);
        b.addEventListener('click', () => { idx = i; render(); });
        elThumbs.appendChild(b);
      });
      render();
      return true;
    }

    function focusables() {
      return [...dialog.querySelectorAll('button,a[href],[tabindex]:not([tabindex="-1"])')]
        .filter(el => el.offsetParent !== null);
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowLeft' && cur.images.length > 1) { go(-1); return; }
      if (e.key === 'ArrowRight' && cur.images.length > 1) { go(1); return; }
      if (e.key === 'Tab') {
        const f = focusables(); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    function finishClose() { modal.hidden = true; modal.removeEventListener('transitionend', onEnd); }
    function onEnd(e) { if (e.target === dialog) finishClose(); }
    function open(dest, trigger) {
      if (!build(dest)) return;
      // cancel any in-flight close so a stale timer can't hide the freshly opened modal
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      modal.removeEventListener('transitionend', onEnd);
      lastFocus = trigger || document.activeElement;
      modal.hidden = false;
      if (lenisRef) lenisRef.stop(); else document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (!RM) { void modal.offsetWidth; modal.classList.add('is-open'); }
      document.addEventListener('keydown', onKey);
      btnClose.focus();
    }
    function close() {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (lenisRef) lenisRef.start();
      modal.classList.remove('is-open');
      if (RM) { finishClose(); }
      else {
        modal.addEventListener('transitionend', onEnd);
        closeTimer = setTimeout(() => { closeTimer = null; if (!modal.hidden) finishClose(); }, 450);
      }
      if (lastFocus) lastFocus.focus();
    }

    btnPrev.addEventListener('click', () => go(-1));
    btnNext.addEventListener('click', () => go(1));
    btnClose.addEventListener('click', close);
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));

    $$('.showcase-panel[data-dest]').forEach(panel => {
      const dest = panel.getAttribute('data-dest');
      const d = DESTS[dest]; if (!d) return;
      panel.setAttribute('role', 'button');
      panel.setAttribute('tabindex', '0');
      panel.setAttribute('aria-haspopup', 'dialog');
      panel.setAttribute('aria-label', 'View ' + d.title + ', ' + d.images.length + ' photos and details');
      panel.addEventListener('click', () => open(dest, panel));
      panel.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(dest, panel); }
      });
    });
  }

  /* ---- MOBILE STICKY CTA ---- */
  const mobileCta = $('#mobileCta');
  const heroEl = $('.hero');
  const contactEl = $('#contact');
  if (mobileCta && heroEl) {
    if (RICH) {
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
    } else {
      const io = new IntersectionObserver(([e]) => {
        mobileCta.classList.toggle('show', !e.isIntersecting);
      }, { threshold: 0 });
      io.observe(heroEl);
      if (contactEl) {
        const cio = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) mobileCta.classList.remove('show');
          else if (scrollY > heroEl.offsetHeight) mobileCta.classList.add('show');
        }, { threshold: 0 });
        cio.observe(contactEl);
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
            onUpdate: function(){ amt.textContent = '€' + Math.round(this.targets()[0].v).toLocaleString('en'); }
          });
        }
      });
    }
  }

})();
