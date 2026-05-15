'use strict';

// ── STICKY NAV ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE HAMBURGER ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── ACTIVE NAV LINK ──
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── SCROLL ANIMATIONS ──
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// ── CONTACT FORM VALIDATION ──
const form = document.getElementById('contact-form');
if (form) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[\d\s\+\-\(\)]{7,20}$/;

  function setError(field, msg) {
    field.classList.add('has-error');
    const err = field.querySelector('.error-msg');
    if (err) err.textContent = msg;
  }
  function clearError(field) {
    field.classList.remove('has-error');
  }

  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      clearError(input.closest('.field'));
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = {
      name: form.querySelector('[name="name"]'),
      email: form.querySelector('[name="email"]'),
      phone: form.querySelector('[name="phone"]'),
      service: form.querySelector('[name="service"]'),
      message: form.querySelector('[name="message"]'),
    };

    Object.values(fields).forEach(f => clearError(f.closest('.field')));

    if (!fields.name.value.trim()) {
      setError(fields.name.closest('.field'), 'Please enter your name.');
      valid = false;
    }
    if (!EMAIL_RE.test(fields.email.value.trim())) {
      setError(fields.email.closest('.field'), 'Please enter a valid email address.');
      valid = false;
    }
    if (fields.phone.value.trim() && !PHONE_RE.test(fields.phone.value.trim())) {
      setError(fields.phone.closest('.field'), 'Please enter a valid phone number.');
      valid = false;
    }
    if (!fields.service.value) {
      setError(fields.service.closest('.field'), 'Please select a service.');
      valid = false;
    }
    if (fields.message.value.trim().length < 10) {
      setError(fields.message.closest('.field'), 'Please write a message (at least 10 characters).');
      valid = false;
    }

    if (valid) {
      const successEl = document.getElementById('form-success');
      form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    }
  });
}
