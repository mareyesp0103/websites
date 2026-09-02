(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var menuToggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");

  var syncHeaderBg = function () {
    var menuOpen = !!mobileNav && mobileNav.classList.contains("flex");
    if (menuOpen || window.scrollY > 40) header.classList.add("compact");
    else header.classList.remove("compact");
  };
  window.addEventListener("scroll", syncHeaderBg, { passive: true });
  syncHeaderBg();

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = !mobileNav.classList.contains("hidden");
      mobileNav.classList.toggle("hidden");
      mobileNav.classList.toggle("flex");
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      syncHeaderBg();
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.add("hidden");
        mobileNav.classList.remove("flex");
        menuToggle.setAttribute("aria-expanded", "false");
        syncHeaderBg();
      });
    });
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero load-in sequence
  var heroWrap = document.querySelector("#inicio > .max-w-6xl");
  if (heroWrap) {
    var heroSteps = Array.prototype.slice.call(heroWrap.children);
    gsap.from(heroSteps, {
      opacity: 0,
      y: 22,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
    });
  }

  var heroChips = document.querySelectorAll("#inicio .format-chip");
  if (heroChips.length) {
    gsap.from(heroChips, {
      opacity: 0,
      y: 14,
      duration: 0.45,
      stagger: 0.06,
      delay: 0.5,
      ease: "power2.out",
    });
  }

  // Scroll-triggered reveals for everything below the hero
  var setupReveals = function () {
    var revealEls = document.querySelectorAll("[data-reveal]");
    revealEls.forEach(function (el) {
      if (el.closest("#inicio")) return;
      var targets = el.children.length ? el.children : el;
      gsap.from(targets, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    });
    ScrollTrigger.refresh();
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setupReveals);
  } else {
    setupReveals();
  }
  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
})();
