/* ===================================================
   ELLIS ARCHER PERFORMANCE — Main JavaScript
   =================================================== */

(function () {
  'use strict';

  // === NAVIGATION ===
  const nav       = document.getElementById('mainNav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // White nav on non-hero pages immediately
  if (!document.querySelector('.hero')) {
    nav && nav.classList.add('scrolled');
  }

  // Scroll → sticky white nav
  window.addEventListener('scroll', () => {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else if (document.querySelector('.hero')) {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  hamburger && hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu && mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu__link, .mobile-menu__close').forEach(el => {
    el.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      mobileMenu && mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // === ACTIVE NAV LINK ===
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.getAttribute('data-nav') === currentFile) {
      link.classList.add('active');
    }
  });

  // === SCROLL ANIMATIONS (Intersection Observer) ===
  const animElems = document.querySelectorAll(
    '.animate-on-scroll, .animate-on-scroll--left, .animate-on-scroll--right'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animElems.forEach(el => observer.observe(el));

  // === FAQ ACCORDION ===
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });

  // === CONTACT FORM VALIDATION ===
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (validateForm()) {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('visible');
      }
    });

    // Live validation — clear error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const errorEl = document.getElementById(field.id + 'Error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  function validateForm() {
    let valid = true;

    // Clear all errors
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => el.classList.remove('error'));

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    if (name && !name.value.trim()) {
      setError(name, 'nameError', 'Please enter your name.');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !email.value.trim()) {
      setError(email, 'emailError', 'Please enter your email address.');
      valid = false;
    } else if (email && !emailRegex.test(email.value.trim())) {
      setError(email, 'emailError', 'Please enter a valid email address.');
      valid = false;
    }

    if (service && !service.value) {
      setError(service, 'serviceError', 'Please select the service you are interested in.');
      valid = false;
    }

    if (message && message.value.trim().length < 10) {
      setError(message, 'messageError', 'Please enter a message (at least 10 characters).');
      valid = false;
    }

    return valid;
  }

  function setError(input, errorId, msg) {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
  }

  // === SMOOTH SCROLL FOR HASH LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (nav ? nav.offsetHeight : 0) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
