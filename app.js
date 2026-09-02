/**
 * 🦷 Dt. Adem Gün — Master Web Engine (Standalone Vanilla JavaScript)
 * Zero CORS / Zero Module dependencies for 100% flawless local file:/// & server execution
 * Integrates Interactive Surgical Implant Showcase, Lenis Smooth Scroll, GSAP ScrollTrigger,
 * Bento Modals, Accordions, Before/After Slider, and Cosmos Stardust Engine.
 */

// ==========================================
// 1. Interactive UI Components Engine
// ==========================================
const ComponentsEngine = {
  initModals() {
    function closeAllModals() {
      document.querySelectorAll('.modal-overlay, .modal-overlay-lux').forEach((modal) => {
        modal.classList.remove('is-active');
      });
      document.body.style.overflow = '';
    }

    // Modal açıcılar
    document.querySelectorAll('[data-modal-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-modal-open');
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Kapatma butonu (X) tıklamaları
    document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeAllModals();
      });
    });

    // Overlay (karanlık arka plan) tıklamaları
    document.querySelectorAll('.modal-overlay, .modal-overlay-lux').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeAllModals();
        }
      });
    });

    // ESC tuşu ile kapatma
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });

    // Randevu formu gönderimi (WhatsApp Yönlendirme)
    const forms = document.querySelectorAll('#appointment-form, #vip-appointment-form');
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('patient-name')?.value || '';
        const phone = document.getElementById('patient-phone')?.value || '';
        const service = document.getElementById('patient-service')?.value || 'İmplant & Estetik Diş';
        const date = document.getElementById('patient-date')?.value || 'En Uygun Tarih';

        const msg = `Merhaba Dt. Adem Gün Kliniği,%0ARandevu Talebim:%0A👤 İsim: ${encodeURIComponent(name)}%0A📞 Telefon: ${encodeURIComponent(phone)}%0A🦷 Tedavi: ${encodeURIComponent(service)}%0A📅 Tarih: ${encodeURIComponent(date)}`;
        window.open(`https://wa.me/905333902924?text=${msg}`, '_blank');

        closeAllModals();
      });
    });
  },

  initBeforeAfter(sliderSelector = '.before-after-slider') {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const afterWrap = slider.querySelector('.after-image-wrap');
    const handle = slider.querySelector('.slider-handle');
    let isDragging = false;

    function updateSlider(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      if (afterWrap) afterWrap.style.width = `${percent}%`;
      if (handle) handle.style.left = `${percent}%`;
    }

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });
  },

  initAccordions(itemSelector = '.accordion-item-lux') {
    const allItems = document.querySelectorAll(itemSelector);
    allItems.forEach((item) => {
      const btn = item.querySelector('.accordion-btn-lux') || item.querySelector('.accordion-header') || item;
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        allItems.forEach((other) => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.accordion-btn-lux') || other.querySelector('.accordion-header');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
};

// ==========================================
// 2. Interactive Surgical & Implant Stage Engine
// ==========================================
function initInteractiveImplantStage() {
  const stageData = [
    {
      stepTitle: 'AŞAMA 01 / ANATOMİ',
      telemetry: 'HASSASİYET: 3D DİJİTAL MİKRON',
      imgSrc: 'assets/stage1_natural_tooth.jpg',
      imgAlt: 'Aşama 01: Doğal Diş Biyomekaniği & Mine',
      material: 'Doğal Mine & Çift Kök Mimarisi',
      goal: 'Maksimum Doku Korunumu',
    },
    {
      stepTitle: 'AŞAMA 02 / CERRAHİ',
      telemetry: 'TORK: 45 Ncm | GRADE-5 TİTANYUM',
      imgSrc: 'assets/stage3_titanium_implant.jpg',
      imgAlt: 'Aşama 02: Titanyum İmplant & Osseointegrasyon',
      material: 'Medikal Titanyum Mikro-Yiv Vida',
      goal: 'Biyolojik Osseointegrasyon',
    },
    {
      stepTitle: 'AŞAMA 03 / RESTORASYON',
      telemetry: 'IŞIK GEÇİRGENLİK: %45 TRANSLUSENT',
      imgSrc: 'assets/stage4_zirconia_crown.jpg',
      imgAlt: 'Aşama 03: Zirkonyum Abutment & Kuron Montajı',
      material: 'CAD/CAM Zirkonyum Monolitik Blok',
      goal: 'Doğal Diş Estetiği & Renk Uyumu',
    },
    {
      stepTitle: 'AŞAMA 04 / SONUÇ',
      telemetry: 'ÇİĞNEME KUVVETİ: 800 N/cm²',
      imgSrc: 'assets/stage5_perfect_smile.jpg',
      imgAlt: 'Aşama 04: Kusursuz Gülüş & Fonksiyon',
      material: 'Kusursuz Biyomekanik Entegrasyon',
      goal: 'Ömür Boyu Kalıcı Gülüş',
    },
  ];

  const titleEl = document.getElementById('stage-hud-step-title');
  const telemetryEl = document.getElementById('stage-hud-telemetry');
  const stageImages = document.querySelectorAll('.stage-layer-img');
  const fallbackImg = document.getElementById('stage-display-img');
  const materialEl = document.getElementById('stage-footer-material');
  const goalEl = document.getElementById('stage-footer-goal');
  const stepCards = document.querySelectorAll('.story-card-step');
  const mobileTabs = document.querySelectorAll('.mobile-stage-tab');

  if ((stageImages.length === 0 && !fallbackImg) || stepCards.length === 0) return;

  // Preload all stage images into browser cache immediately for 0ms transitions
  stageData.forEach((item) => {
    const preload = new Image();
    preload.src = item.imgSrc;
  });

  function setActiveStage(index) {
    const data = stageData[index];
    if (!data) return;

    // Instant 0ms GPU Crossfade via stacked layers
    if (stageImages.length > 0) {
      stageImages.forEach((img, idx) => {
        img.classList.toggle('active', idx === index);
      });
    } else if (fallbackImg) {
      fallbackImg.src = data.imgSrc;
      fallbackImg.alt = data.imgAlt;
    }

    if (titleEl) titleEl.textContent = data.stepTitle;
    if (telemetryEl) telemetryEl.textContent = data.telemetry;
    if (materialEl) materialEl.textContent = data.material;
    if (goalEl) goalEl.textContent = data.goal;

    stepCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });

    mobileTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === index);
    });
  }

  // Click & Hover listeners on step cards (Desktop)
  stepCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      setActiveStage(idx);
    });

    card.addEventListener('mouseenter', () => {
      setActiveStage(idx);
    });
  });

  // Click listeners on mobile stage tabs
  mobileTabs.forEach((tab, idx) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveStage(idx);
    });
  });

  // Initialize stage 0 immediately so it is never empty
  setActiveStage(0);
}

// ==========================================
// 3. Fullscreen Ambient Cosmos Canvas Engine (Ultra-Lightweight 60 FPS)
// ==========================================
function initAmbientCosmosEngine() {
  const canvas = document.getElementById('ambient-cosmos-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const starCount = Math.floor(Math.min(width, 1920) / 45); // Hafif ve dengeli parçacık sayısı
  const stars = [];

  const colorPalette = [
    'rgba(0, 242, 254, ',
    'rgba(255, 255, 255, ',
    'rgba(229, 184, 92, ',
    'rgba(56, 189, 248, '
  ];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      baseRadius: Math.random() * 1.4 + 0.6,
      colorPrefix: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      alpha: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
    });
  }

  let time = 0;
  let animFrameId = null;

  function render() {
    time += 0.015;
    ctx.clearRect(0, 0, width, height);

    // Sadece hafif ve optimize edilmiş yıldızlar çizilir (GPU-dostu)
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.x += star.vx;
      star.y += star.vy;
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      const twinkle = Math.sin(time * 2 + star.phase) * 0.35 + 0.65;
      const currentAlpha = Math.min(1, star.alpha * twinkle);

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = star.colorPrefix + currentAlpha + ')';
      ctx.fill();
    }

    animFrameId = requestAnimationFrame(render);
  }
  render();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  }, { passive: true });
}

// ==========================================
// 4. Dual Theme Engine (Warm Beige & Dark Obsidian)
// ==========================================
function initThemeEngine() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const moonIcon = document.querySelector('.theme-icon-moon');
  const sunIcon = document.querySelector('.theme-icon-sun');
  const toggleText = document.querySelector('.theme-toggle-text');

  // Her zaman Bej mod ile başla
  applyTheme('beige');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('dt_adem_theme', theme); } catch(e) {}

    if (theme === 'dark') {
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'inline-flex';
      if (toggleText) toggleText.textContent = 'Bej Mod';
      if (toggleBtn) toggleBtn.setAttribute('title', 'Sıcak Bej Moda Geç');
    } else {
      if (moonIcon) moonIcon.style.display = 'inline-flex';
      if (sunIcon) sunIcon.style.display = 'none';
      if (toggleText) toggleText.textContent = 'Koyu Mod';
      if (toggleBtn) toggleBtn.setAttribute('title', 'Koyu Obsidyen Moda Geç');
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'beige';
      const newTheme = currentTheme === 'dark' ? 'beige' : 'dark';
      applyTheme(newTheme);
    });
  }
}

// ==========================================
// 5. Master Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // A. Initialize Dual Theme Engine
  initThemeEngine();

  // B. Initialize Lenis Smooth Scroll
  let lenisInstance = null;
  if (typeof window.Lenis !== 'undefined') {
    lenisInstance = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    if (window.ScrollTrigger) {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // C. Initialize Fullscreen Background Cosmos
  initAmbientCosmosEngine();

  // D. Initialize Interactive UI Components
  ComponentsEngine.initModals();
  ComponentsEngine.initAccordions('.accordion-item-lux');
  ComponentsEngine.initBeforeAfter('.before-after-slider');

  // E. Initialize Interactive Surgical Stage Showcase
  initInteractiveImplantStage();

  // F. GSAP Navbar Scroll State
  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        const nav = document.querySelector('.dental-nav');
        if (nav) nav.classList.toggle('is-scrolled', self.progress > 0);
      }
    });

    ScrollTrigger.refresh();
  }
});
