document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderPct = document.getElementById('loaderPct');
  let progress = 0;
  document.body.style.overflow = 'hidden';

  const loaderInterval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
    loaderProgress.style.width = progress + '%';
    loaderPct.textContent = Math.floor(progress) + '%';
  }, 130);

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    let current = 'home';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 130 && rect.bottom >= 130) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
    backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  document.querySelectorAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const item = head.closest('.acc-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  const projectData = {
    foxyz: {
      title: 'Foxyz Death MD',
      icon: 'fa-brands fa-whatsapp',
      tags: ['NODE.JS', 'BAILEYS', 'CJS', 'AXIOS'],
      problem: 'Butuh bot WhatsApp yang stabil, mudah dikembangkan, dan bisa menangani banyak command tanpa bergantung pada plugin eksternal.',
      solution: 'Dibangun di atas Baileys dengan command handler CJS murni — setiap command self-contained, termasuk fitur AI chat, image processing, dan konversi website ke APK.',
      impact: 'Bot berjalan stabil dengan session persistence, siap dikembangkan lebih lanjut tanpa merombak struktur inti.'
    },
    telegraf: {
      title: 'Telegraf Rich Bot',
      icon: 'fa-brands fa-telegram',
      tags: ['TELEGRAF', 'NODE.JS', 'MYSQL'],
      problem: 'Perlu bot Telegram dengan tampilan menu yang lebih hidup, bukan sekadar teks statis.',
      solution: 'Memanfaatkan fitur rich message Telegram Bot API untuk animasi loading state sebelum menu final ditampilkan, didukung database MySQL.',
      impact: 'Pengalaman pengguna terasa lebih responsif dan interaktif dibanding bot teks biasa.'
    },
    assistant: {
      title: 'LeoMods Assistant',
      icon: 'fa-solid fa-robot',
      tags: ['NODE.JS', 'PM2', 'UI/UX'],
      problem: 'Butuh akses ke asisten AI dalam bentuk web app yang ringan tanpa biaya API resmi.',
      solution: 'Membangun scraper dengan backend Node.js, autentikasi berbasis cookie sebagai solusi terhadap pemblokiran IP, dan UI putih-ungu yang bersih.',
      impact: 'Aplikasi berjalan stabil di produksi dengan PM2, siap diakses kapan saja.'
    },
    portfolio: {
      title: 'LeoMods Portfolio',
      icon: 'fa-solid fa-globe',
      tags: ['HTML', 'CSS', 'JAVASCRIPT'],
      problem: 'Perlu portofolio yang mencerminkan gaya kerja sebagai bot &amp; web developer, bukan template generik.',
      solution: 'Dirancang dengan gaya neobrutalism — warna flat, border tebal, shadow keras — dan dipenuhi animasi di setiap section.',
      impact: 'Portofolio yang mudah diingat dan membedakan LeoMods dari developer lain.'
    }
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalThumb = document.getElementById('modalThumb');
  const modalTitle = document.getElementById('modalTitle');
  const modalTags = document.getElementById('modalTags');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalImpact = document.getElementById('modalImpact');

  function openModal(key) {
    const data = projectData[key];
    if (!data) return;
    modalThumb.innerHTML = `<i class="${data.icon}"></i>`;
    modalTitle.textContent = data.title;
    modalTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalImpact.textContent = data.impact;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.classList.contains('project-card') && e.target.closest('.view-details')) return;
      openModal(el.dataset.modal);
    });
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const WHATSAPP_NUMBER = '62882007908344';
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitText = document.getElementById('submitText');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const phone = document.getElementById('cfPhone').value.trim();
    const message = document.getElementById('cfMessage').value.trim();

    submitBtn.classList.add('sending');
    submitText.textContent = 'MEMBUKA WHATSAPP…';
    formStatus.classList.remove('show');

    const waText = [
      `Halo LeoMods, saya ${name}.`,
      `Email: ${email}`,
      phone ? `No. HP: ${phone}` : null,
      `Pesan: ${message}`
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    window.open(waUrl, '_blank');

    setTimeout(() => {
      submitBtn.classList.remove('sending');
      submitText.textContent = 'SEND MESSAGE';
      formStatus.textContent = 'WhatsApp terbuka di tab baru — tinggal kirim pesannya 🚀';
      formStatus.classList.add('show');
      contactForm.reset();
      setTimeout(() => formStatus.classList.remove('show'), 5000);
    }, 500);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});