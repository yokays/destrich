(function() {

  // ===== SVG Icons (shared) =====
  var ICONS = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 0114 1.18 2 2 0 0116 3.18v3a2 2 0 01-1.45 1.94l-1.35.45a14 14 0 006.23 6.23l.45-1.35A2 2 0 0122 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
  };

  // ===== Shared Footer =====
  function renderFooters() {
    var footerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-brand">' +
          '<div class="nav-logo"><img src="img/logo.jpg" alt="Compagnon Destrich couvreur Grenoble"/><span class="nav-logo-text" style="color:#fff;">Compagnon <span style="color:var(--orange)">Destrich</span></span></div>' +
          '<p>Compagnon Destrich – Artisan couvreur qualifié, Grenoble & Sassenage (38). Toiture, zinguerie, maçonnerie sur l\'Isère.</p>' +
        '</div>' +
        '<div class="footer-col"><h4>Navigation</h4><ul>' +
          '<li><a href="#" data-page="accueil">Accueil</a></li>' +
          '<li><a href="#" data-page="services">Services</a></li>' +
          '<li><a href="#" data-page="apropos">À Propos</a></li>' +
          '<li><a href="#" data-page="contact">Contact & Devis</a></li>' +
        '</ul></div>' +
        '<div class="footer-col"><h4>Contact</h4>' +
          '<div class="footer-contact-item">' + ICONS.phone + '<span><a href="tel:0779496553">07 79 49 65 53</a></span></div>' +
          '<div class="footer-contact-item">' + ICONS.mail + '<span><a href="mailto:Multi.bat@live.fr">Multi.bat@live.fr</a></span></div>' +
          '<div class="footer-contact-item">' + ICONS.location + '<span>4 rue Amédée Morel – 38100 Grenoble<br>18 chemin du Bac – 38360 Sassenage</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom"><span>&copy; 2026 <span>Compagnon Destrich</span> – Artisan Couvreur</span><span>Grenoble & Sassenage – Isère (38)</span></div>';

    var footers = document.querySelectorAll('footer');
    for (var i = 0; i < footers.length; i++) {
      footers[i].innerHTML = footerHTML;
    }
  }

  // ===== Navigation =====
  function showPage(id) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
    var pg = document.getElementById('page-' + id);
    if (pg) pg.classList.add('active');
    var navLinks = document.querySelectorAll('.nav-links a');
    for (var j = 0; j < navLinks.length; j++) navLinks[j].classList.remove('active');
    var navEl = document.getElementById('nav-' + id);
    if (navEl) navEl.classList.add('active');
    window.scrollTo(0, 0);
    closeMenu();
    setTimeout(initReveal, 100);
  }

  function showSubpage(id) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
    var pg = document.getElementById('page-' + id);
    if (pg) pg.classList.add('active');
    var navLinks = document.querySelectorAll('.nav-links a');
    for (var j = 0; j < navLinks.length; j++) navLinks[j].classList.remove('active');
    var navEl = document.getElementById('nav-services');
    if (navEl) navEl.classList.add('active');
    window.scrollTo(0, 0);
    closeMenu();
    setTimeout(initReveal, 100);
  }

  // ===== Mobile Menu =====
  function toggleMenu() {
    var nl = document.getElementById('navLinks');
    if (nl) nl.classList.toggle('open');
  }

  function closeMenu() {
    var nl = document.getElementById('navLinks');
    if (nl) nl.classList.remove('open');
  }

  // ===== Scroll Reveal =====
  function initReveal() {
    var els = document.querySelectorAll('.page.active .reveal');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('visible');
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('visible');
      obs.observe(els[i]);
    }
  }

  // ===== Hero Slideshow =====
  var slideIdx = 0;
  function nextSlide() {
    var slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    slides[slideIdx].classList.remove('active');
    slideIdx = (slideIdx + 1) % slides.length;
    slides[slideIdx].classList.add('active');
  }
  setInterval(nextSlide, 4500);

  // ===== Form Handling =====
  function submitForm(prefix) {
    var required = [prefix+'-prenom', prefix+'-nom', prefix+'-tel', prefix+'-service'];
    var ok = true;
    for (var i = 0; i < required.length; i++) {
      var el = document.getElementById(required[i]);
      if (!el || !el.value.trim()) { if (el) el.style.borderColor = '#ef4444'; ok = false; }
      else { el.style.borderColor = ''; }
    }
    if (!ok) return;
    var success = document.getElementById('form-success-' + prefix);
    if (success) success.style.display = 'block';
    var fields = [prefix+'-prenom',prefix+'-nom',prefix+'-tel',prefix+'-email',prefix+'-service',prefix+'-ville',prefix+'-msg',prefix+'-urgence',prefix+'-surface'];
    for (var j = 0; j < fields.length; j++) {
      var el = document.getElementById(fields[j]); if (el) el.value = '';
    }
    setTimeout(function() {
      var s = document.getElementById('form-success-' + prefix);
      if (s) s.style.display = 'none';
    }, 6000);
  }

  // ===== Event Binding =====
  function bindAll() {
    renderFooters();

    document.querySelectorAll('[data-page]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(el.getAttribute('data-page'));
      });
    });

    document.querySelectorAll('[data-subpage]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        showSubpage(el.getAttribute('data-subpage'));
      });
    });

    document.querySelectorAll('[data-form]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        submitForm(el.getAttribute('data-form'));
      });
    });

    var hb = document.getElementById('hamburger');
    if (hb) hb.addEventListener('click', toggleMenu);

    initReveal();
  }

  // ===== Init =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll);
  } else {
    bindAll();
  }

})();
