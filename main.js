(function() {
  "use strict";

  /* ---- Mobile Nav Toggle ---- */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu ul');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      mobileNavToggle.classList.toggle('bi-x');
      mobileNavToggle.classList.toggle('bi-list');
    });
  }

  /* ---- Dropdown toggle on mobile ---- */
  document.querySelectorAll('.navmenu .dropdown > a').forEach(el => {
    el.addEventListener('click', function(e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        const sub = this.nextElementSibling;
        if (sub) sub.classList.toggle('open');
      }
    });
  });

  /* ---- Sticky header shadow ---- */
  const header = document.querySelector('#header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ---- Hero carousel indicators auto-build ---- */
  const heroCarousel = document.getElementById('hero-carousel');
  if (heroCarousel) {
    const items = heroCarousel.querySelectorAll('.carousel-item');
    const indicators = heroCarousel.querySelector('.carousel-indicators');
    if (indicators) {
      items.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.dataset.bsTarget = '#hero-carousel';
        btn.dataset.bsSlideTo = i;
        btn.setAttribute('aria-label', `Slide ${i + 1}`);
        if (i === 0) { btn.classList.add('active'); btn.setAttribute('aria-current', 'true'); }
        indicators.appendChild(btn);
      });
    }
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('faq-active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-active'));
      if (!isActive) item.classList.add('faq-active');
    });
  });

  /* ---- Doctor filter ---- */
  document.querySelectorAll('.doctors-filter button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.doctors-filter button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-dept]').forEach(card => {
        const show = filter === 'all' || card.dataset.dept === filter;
        card.parentElement.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---- Appointment form submit ---- */
  const apptForm = document.getElementById('appointmentForm');
  if (apptForm) {
    apptForm.addEventListener('submit', e => {
      e.preventDefault();
      const sent = apptForm.querySelector('.sent-message');
      const btn = apptForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        sent.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Make an Appointment';
        apptForm.reset();
        setTimeout(() => sent.style.display = 'none', 4000);
      }, 1200);
    });
  }

  /* ---- Contact form submit ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const sent = contactForm.querySelector('.sent-message');
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        sent.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Send Message';
        contactForm.reset();
        setTimeout(() => sent.style.display = 'none', 4000);
      }, 1000);
    });
  }

  /* ---- Swiper init ---- */
  function initSwipers() {
    document.querySelectorAll('.init-swiper').forEach(el => {
      const configEl = el.querySelector('.swiper-config');
      let config = {};
      if (configEl) {
        try { config = JSON.parse(configEl.textContent); } catch(e) {}
      }
      new Swiper(el, config);
    });
  }
  if (typeof Swiper !== 'undefined') initSwipers();
  else window.addEventListener('load', initSwipers);

  /* ---- AOS init ---- */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });
    if (typeof PureCounter !== 'undefined') new PureCounter();
  });

})();