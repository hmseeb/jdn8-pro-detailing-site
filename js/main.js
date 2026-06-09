/**
 * JDN8 Pro Detailing – Main JavaScript
 */

'use strict';

/* ============================================================
   Sticky Header
   ============================================================ */
(function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on load
})();

/* ============================================================
   Mobile Navigation Toggle
   ============================================================ */
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ============================================================
   Active Nav Link on Scroll
   ============================================================ */
(function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id], main > *[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (section) { observer.observe(section); });
})();

/* ============================================================
   Scroll Fade-In Animations
   ============================================================ */
(function initFadeIn() {
  // Add .fade-in to animatable elements
  const targets = document.querySelectorAll(
    '.service-card, .testimonial-card, .why-item, .contact-card, .gallery-item, .hero-badge'
  );

  targets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   Contact Form Handling
   ============================================================ */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic front-end validation
    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');
    let valid = true;

    [name, email, message].forEach(function (field) {
      if (!field) return;
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e8a000';
        valid = false;
      }
    });

    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.style.borderColor = '#e8a000';
      valid = false;
    }

    if (!valid) {
      const firstInvalid = form.querySelector('[style*="border-color"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Show success message (in production, this would POST to a backend)
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    // Simulate async submission
    setTimeout(function () {
      form.style.display = 'none';
      if (success) success.hidden = false;
    }, 800);
  });
})();

/* ============================================================
   Footer Year
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   Smooth Scroll Polyfill for older browsers
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
