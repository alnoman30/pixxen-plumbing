// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// Pixxen Physical plumbing js start

// Plumbing CTA btn
document.addEventListener('DOMContentLoaded', () => {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduceMotion) return;

  document.querySelectorAll('.plumbing-cta').forEach((btn) => {
    const fill = btn.querySelector('.plumbing-cta-fill');
    const label = btn.querySelector('.plumbing-cta-label');

    // Read config from HTML
    const hoverBg = btn.dataset.hoverBg || '#144947';
    const hoverText = btn.dataset.hoverText; // optional
    const baseText = getComputedStyle(label).color; // resting text color

    fill.style.backgroundColor = hoverBg;
    gsap.set(fill, { xPercent: -50, yPercent: -50, scale: 0 });

    const place = (e) => {
      const r = btn.getBoundingClientRect();
      const size = Math.hypot(r.width, r.height) * 2;
      gsap.set(fill, {
        width: size,
        height: size,
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      });
    };

    btn.addEventListener('mouseenter', (e) => {
      place(e);
      gsap.to(fill, { scale: 1, duration: 0.7, ease: 'power3.out', overwrite: true });
      if (hoverText) {
        gsap.to(label, {
          color: hoverText,
          duration: 0.3,
          delay: 0.05,
          ease: 'power1.out',
          overwrite: true,
        });
      }
    });

    btn.addEventListener('mouseleave', (e) => {
      const r = btn.getBoundingClientRect();
      gsap.set(fill, { x: e.clientX - r.left, y: e.clientY - r.top });
      gsap.to(fill, { scale: 0, duration: 0.5, ease: 'power3.inOut', overwrite: true });
      if (hoverText) {
        gsap.to(label, {
          color: baseText,
          duration: 0.25,
          ease: 'power1.out',
          overwrite: true,
        });
      }
    });
  });
});


// Plumbing project horizontal scroll section
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const track = document.querySelector(".plumbing-projects-track");
    const headerElement = document.querySelector("#plumbing-project-section-header");

    if (!track || !headerElement) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    ScrollTrigger.matchMedia({

        // DESKTOP (768px and up): pin + horizontal scroll
        "(min-width: 768px)": function () {
            const cards = gsap.utils.toArray(".plumbing-project-card");

            const horizontalTween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: headerElement,
                    pin: "#pinned-projects-section",
                    anticipatePin: 1,
                    scrub: 0.5,
                    start: "top top",
                    end: () => "+=" + Math.abs(getScrollAmount()),
                    invalidateOnRefresh: true, // recalculates on resize
                    markers: false
                }
            });

            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0.8, scale: 0.98, y: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalTween,
                            start: "left 90%",
                            toggleActions: "play reverse play reverse",
                            markers: false
                        }
                    }
                );
            });
        },

        // MOBILE (below 768px): native touch slider, no GSAP
        "(max-width: 767px)": function () {
            // Nothing to set up. Any desktop animations are reverted
            // automatically and inline styles are cleared when this query matches.
        }
    });

    // Optional: recalc after images/fonts load so the scroll distance is accurate
    window.addEventListener("load", () => ScrollTrigger.refresh());
});

// Plumbing section heading reveal
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headings = gsap.utils.toArray(".plumbing-section-heading");

  headings.forEach((heading) => {
    let split;

    const createAnimation = () => {
      // Clean up the previous SplitText instance
      if (split) {
        split.revert();
      }

      // Create a new split based on the current screen width
      split = new SplitText(heading, {
        type: "lines",
        linesClass: "split-line",
        mask: "lines",
      });

      // Set initial state
      gsap.set(split.lines, {
        yPercent: 110,
        opacity: 0,
      });

      // Create animation
      gsap.to(split.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    };

    createAnimation();

    // Re-split when the window is resized
    let resizeTimer;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        // Kill existing ScrollTrigger for this heading
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === heading) {
            trigger.kill();
          }
        });

        createAnimation();

        // Refresh ScrollTrigger positions
        ScrollTrigger.refresh();
      }, 250);
    });
  });
});


// Plumbing banner section animation
/*
  Plumbing hero: GSAP animation (mobile-optimised)
  Requires GSAP core only (no plugins):
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  Load this file after GSAP, at the end of <body>.
*/
(function () {
  const section = document.getElementById('therappy-banner-section');
  if (!section || !window.gsap) return;

  const q = (s) => section.querySelector(s);
  const qa = (s) => section.querySelectorAll(s);

  /* ---------- 1. CTA: fill expands from the pointer's entry point (hover devices only) ---------- */
  function initCta() {
    if (!window.matchMedia('(hover: hover)').matches) return; // skip on touch screens

    qa('.plumbing-cta').forEach((btn) => {
      const fill = btn.querySelector('.plumbing-cta-fill');
      const label = btn.querySelector('.plumbing-cta-label');
      if (!fill || !label) return;

      const hoverBg = btn.dataset.hoverBg || '#144947';
      const hoverText = btn.dataset.hoverText || '#ffffff';
      const baseText = getComputedStyle(label).color;

      gsap.set(fill, { backgroundColor: hoverBg, scale: 0, xPercent: -50, yPercent: -50 });

      const place = (cx, cy) => {
        const r = btn.getBoundingClientRect();
        const size = Math.hypot(r.width, r.height) * 2;
        gsap.set(fill, { width: size, height: size, x: cx - r.left, y: cy - r.top });
      };
      const center = () => {
        const r = btn.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2];
      };
      const open = (cx, cy) => {
        place(cx, cy);
        gsap.to(fill, { scale: 1, duration: 0.55, ease: 'power3.out', overwrite: true });
        gsap.to(label, { color: hoverText, duration: 0.3, overwrite: true });
      };
      const close = (cx, cy) => {
        place(cx, cy);
        gsap.to(fill, { scale: 0, duration: 0.45, ease: 'power3.inOut', overwrite: true });
        gsap.to(label, { color: baseText, duration: 0.3, overwrite: true });
      };

      btn.addEventListener('mouseenter', (e) => open(e.clientX, e.clientY));
      btn.addEventListener('mouseleave', (e) => close(e.clientX, e.clientY));
      btn.addEventListener('focus', () => open(...center()));
      btn.addEventListener('blur', () => close(...center()));
    });
  }

  /* ---------- 2. Wait for fonts + hero image decode (max 1.2s) ---------- */
  const heroEl = q('.plumbing-hero-image');
  const heroImg = heroEl && (heroEl.tagName === 'IMG' ? heroEl : heroEl.querySelector('img'));
  const decoded =
    heroImg && heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve();
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  const ready = Promise.race([
    Promise.all([fontsReady, decoded]),
    new Promise((res) => setTimeout(res, 1200)),
  ]);

  /* ---------- 3. Timelines ---------- */
  function init() {
    initCta();

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 1280px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 1279px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { desktop } = ctx.conditions;

        const title = q('.plumbing-hero-title');
        const desc = q('.plumbing-hero-desc');
        const cta = q('.plumbing-hero-cta');
        const checks = qa('.plumbing-hero-check-item');
        const checkIcons = qa('.plumbing-hero-check-item img');
        const price = q('.plumbing-hero-pricebox');
        const hammer = desktop ? q('.plumbing-hero-hammer') : null; // hidden below xl, don't animate

        const targets = [title, desc, cta, price, heroEl, hammer, ...checks].filter(Boolean);

        // Hide immediately so nothing flashes while we wait for fonts / image decode
        gsap.set(targets, { autoAlpha: 0 });

        let killed = false;

        ready.then(() => {
          if (killed) return;

          // Promote the big image to its own GPU layer before it moves
          if (heroEl) gsap.set(heroEl, { willChange: 'transform, opacity', force3D: true });

          const tl = gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } });

          if (desktop) {
            gsap.set(title, { y: 40 });
            gsap.set(desc, { y: 20 });
            gsap.set(cta, { y: 16, scale: 0.92 });
            gsap.set(checks, { x: -18 });
            gsap.set(checkIcons, { scale: 0 });
            gsap.set(price, { y: 24 });

            tl.to(title, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
              .to(desc, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.5')
              .to(cta, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, '-=0.4')
              .to(checks, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
              .to(checkIcons, { scale: 1, duration: 0.4, ease: 'back.out(2.5)', stagger: 0.08 }, '<')
              .to(price, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4');

            if (heroEl) {
              gsap.fromTo(heroEl, { x: 80, scale: 1.06, autoAlpha: 0 },
                { x: 0, scale: 1, autoAlpha: 1, duration: 1.3, ease: 'power3.out', delay: 0.1,
                  onComplete: () => gsap.set(heroEl, { willChange: 'auto' }) });
            }
            if (hammer) {
              gsap.fromTo(hammer,
                { y: -80, rotation: -18, transformOrigin: '50% 100%', autoAlpha: 0 },
                { y: 0, rotation: 0, autoAlpha: 1, duration: 1, ease: 'back.out(1.4)', delay: 0.9 });
            }
          } else {
            // Mobile: opacity + small translate only, no scale, no image slide, shorter timings
            const from = (el, y) => el && gsap.set(el, { y });
            from(title, 20); from(desc, 14); from(cta, 12); from(price, 14);
            gsap.set(checks, { y: 10 });

            tl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
              .to(desc, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35')
              .to(cta, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.3')
              .to(checks, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05 }, '-=0.2')
              .to(price, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.3');

            if (heroEl) {
              gsap.to(heroEl, { autoAlpha: 1, duration: 0.7, ease: 'power2.out', delay: 0.15,
                onComplete: () => gsap.set(heroEl, { willChange: 'auto' }) });
            }
          }
        });

        return () => { killed = true; };
      }
    );
  }

  init();
})();


// 
// plumbing FAQ section
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".plumbing-faq-item");

    faqItems.forEach(function (item) {
        const trigger = item.querySelector(".plumbing-faq-trigger");
        const content = item.querySelector(".plumbing-faq-content");
        const icon = item.querySelector(".plumbing-icon-close img");

        trigger.addEventListener("click", function () {
            const isOpen = item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(function (faq) {
                faq.classList.remove("active");

                const faqContent = faq.querySelector(".plumbing-faq-content");
                const faqIcon = faq.querySelector(".plumbing-icon-close img");

                faqContent.style.maxHeight = "0px";

                if (faqIcon) {
                    faqIcon.style.transform = "rotate(0deg)";
                }
            });

            // Open clicked FAQ
            if (!isOpen) {
                item.classList.add("active");

                content.style.maxHeight = content.scrollHeight + "px";

                if (icon) {
                    icon.style.transform = "rotate(45deg)";
                }
            }
        });
    });
});