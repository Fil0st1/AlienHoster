/* ============================================================
   AlienHoster — JavaScript
   Stars canvas, counters, reveal, FAQ, tabs, mobile nav
   ============================================================ */

(function () {
  'use strict';

  // ── Loading Screen ──────────────────────────────────────
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 600);
  });

  // ── Star-field Canvas ───────────────────────────────────
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 180;
  const CONNECT_DIST = 120;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.7
          ? 'rgba(124,58,237,' : (Math.random() > 0.5
            ? 'rgba(56,189,248,' : 'rgba(248,250,252,')
      });
    }
  }
  createStars();

  let mouse = { x: -9999, y: -9999 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color + s.alpha + ')';
      ctx.fill();

      // Connect nearby stars
      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dx = s.x - s2.x;
        const dy = s.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = 'rgba(56,189,248,' + (1 - dist / CONNECT_DIST) * 0.12 + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse interaction — attract slightly
      const mdx = mouse.x - s.x;
      const mdy = mouse.y - s.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 160) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(124,58,237,' + (1 - mDist / 160) * 0.25 + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // ── Scroll Progress Bar ─────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ── Navbar scroll class ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // ── Mobile Navigation ───────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = mobileNav.querySelectorAll('a');

  function toggleMobile() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }
  hamburger.addEventListener('click', toggleMobile);
  mobileOverlay.addEventListener('click', toggleMobile);
  mobileLinks.forEach(link => link.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) toggleMobile();
  }));

  // ── Scroll Reveal ───────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ───────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  let counted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('why-us');
  if (statsSection) counterObserver.observe(statsSection);

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 2200;
    const steps = 80;
    const stepTime = duration / steps;
    let current = 0;
    const inc = target / steps;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        el.textContent = prefix + target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      }
    }, stepTime);
  }

  // ── Pricing Tabs ────────────────────────────────────────
  const tabs = document.querySelectorAll('.pricing-tab');
  const panels = document.querySelectorAll('.pricing-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-panel')).classList.add('active');
    });
  });

  // ── FAQ Accordion ───────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');
    const inner = item.querySelector('.faq-body-inner');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(fi => {
        fi.classList.remove('active');
        fi.querySelector('.faq-body').style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = inner.scrollHeight + 24 + 'px';
      }
    });
  });

})();
