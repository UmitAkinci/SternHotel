/* ============================================================
   OBSIDIAN PALACE HOTEL — Ortak JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll efekti ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Aktif link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  /* ── Hamburger menü ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay    = document.querySelector('.mobile-overlay');

  const closeMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  /* ── Scroll animasyonları ── */
  const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(el => observer.observe(el));
  }

  /* ── Video kontrolleri ── */
  const video  = document.querySelector('.video-section video');
  const btnPlay = document.getElementById('btn-play');
  const btnMute = document.getElementById('btn-mute');

  if (video && btnPlay) {
    btnPlay.addEventListener('click', () => {
      if (video.paused) { video.play(); btnPlay.textContent = '⏸'; }
      else              { video.pause(); btnPlay.textContent = '▶'; }
    });
  }
  if (video && btnMute) {
    btnMute.addEventListener('click', () => {
      video.muted = !video.muted;
      btnMute.textContent = video.muted ? '🔇' : '🔊';
    });
  }

  /* ── Galeri lightbox ── */
  const lightbox     = document.querySelector('.lightbox');
  const lightboxImg  = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (src && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── İletişim formu ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.textContent = 'Gönderiliyor…';

      const data = {
        name:    contactForm.querySelector('[name=name]').value,
        email:   contactForm.querySelector('[name=email]').value,
        phone:   contactForm.querySelector('[name=phone]')?.value || '',
        subject: contactForm.querySelector('[name=subject]')?.value || 'Genel',
        message: contactForm.querySelector('[name=message]').value,
      };

      try {
        const res = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok || res.status === 201) {
          contactForm.style.display = 'none';
          document.getElementById('form-success').classList.add('show');
        } else {
          throw new Error();
        }
      } catch {
        btn.disabled = false;
        btn.textContent = 'Gönder';
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    });
  }

  /* ── Rezervasyon butonu scroll ── */
  document.querySelectorAll('[href="#rezervasyon"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('rezervasyon')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
