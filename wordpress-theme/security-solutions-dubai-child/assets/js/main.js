/* Security Solutions Dubai Child — interactions (vanilla, no libraries). */
(function () {
  'use strict';

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.ssdk-site-header[data-sticky]');
  if (header) {
    var utilbar = header.previousElementSibling;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;
        if (y > 8) {
          header.classList.add('is-sticky');
        } else {
          header.classList.remove('is-sticky');
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile drawer ---------- */
  var burger = document.getElementById('ssdk-burger');
  var drawer = document.getElementById('ssdk-mobile-menu');
  if (burger && drawer) {
    var backdrop = document.createElement('div');
    backdrop.className = 'ssdk-mobile-backdrop';
    document.body.appendChild(backdrop);

    function openMenu() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeMenu(); else openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Mobile sub-menu triggers ---------- */
  document.querySelectorAll('.m-trigger').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var panel = btn.nextElementSibling;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
    });
  });

  /* ---------- Testimonial slider ---------- */
  var slider = document.querySelector('.ssdk-testimonials-slider');
  if (slider) {
    var track = slider.querySelector('.ssdk-testimonial-track');
    var slides = Array.from(slider.querySelectorAll('.ssdk-testimonial'));
    var prev = slider.querySelector('[data-slide="prev"]');
    var next = slider.querySelector('[data-slide="next"]');
    var index = 0;
    var timer = null;

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        s.hidden = n !== index;
      });
      slides[index].hidden = false;
    }
    if (prev) prev.addEventListener('click', function () { go(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(index + 1); restart(); });
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 7000);
    }
    if (slides.length) {
      go(0);
      restart();
      // Pause on hover.
      slider.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
      slider.addEventListener('mouseleave', restart);
      // Touch swipe.
      var startX = null;
      slider.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
      slider.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
        startX = null;
      });
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.ssdk-faq-item').forEach(function (item) {
    var q = item.querySelector('.ssdk-faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Reveal animation (subtle, respects reduced motion) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var reveal = document.querySelectorAll('[data-reveal]');
    if (reveal.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 });
      reveal.forEach(function (el) { io.observe(el); });
    }
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
