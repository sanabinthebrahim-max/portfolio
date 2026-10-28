/*
  PORTFOLIO CUSTOMIZATION
  -----------------------
  Replace the sample values below with your real details.
  Leave a contact field as an empty string to hide that contact method.
  Do not publish private contact information unless you want it to be public.
*/
const PORTFOLIO = {
  name: "Your Name",
  initials: "YN",
  location: "Kerala, India",
  contacts: {
    email: "",                  // e.g. "hello@example.com"
    phone: "",                  // e.g. "+919876543210" (include country code)
    whatsapp: "",               // digits only, with country code, e.g. "919876543210"
    linkedin: "",               // e.g. "https://www.linkedin.com/in/your-profile/"
    github: "",                 // e.g. "https://github.com/your-username"
    instagram: ""               // e.g. "https://www.instagram.com/your-profile/"
  },
  whatsappMessage: "Hello! I found your portfolio and would like to connect."
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const backTop = document.getElementById("back-top");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Personal details are centralized in PORTFOLIO above.
  document.querySelectorAll("[data-personal]").forEach((node) => {
    const key = node.dataset.personal;
    if (PORTFOLIO[key]) node.textContent = PORTFOLIO[key];
  });
  document.querySelectorAll(".brand-mark").forEach((node) => {
    node.textContent = PORTFOLIO.initials || "YN";
  });
  document.title = `${PORTFOLIO.name || "Your Name"} — Data Science Portfolio`;
  const description = document.querySelector('meta[name="description"]');
  if (description && PORTFOLIO.name && PORTFOLIO.name !== "Your Name") {
    description.content = `Portfolio of ${PORTFOLIO.name}, a BCA graduate pursuing Data Science.`;
  }

  // Build safe, clickable contact links only when real details are supplied.
  const contactUrls = {
    email: PORTFOLIO.contacts.email ? `mailto:${PORTFOLIO.contacts.email}` : "",
    phone: PORTFOLIO.contacts.phone ? `tel:${PORTFOLIO.contacts.phone.replace(/[^\d+]/g, "")}` : "",
    whatsapp: PORTFOLIO.contacts.whatsapp
      ? `https://wa.me/${PORTFOLIO.contacts.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(PORTFOLIO.whatsappMessage)}`
      : "",
    linkedin: validProfileUrl(PORTFOLIO.contacts.linkedin, "linkedin.com"),
    github: validProfileUrl(PORTFOLIO.contacts.github, "github.com"),
    instagram: validProfileUrl(PORTFOLIO.contacts.instagram, "instagram.com")
  };
  document.querySelectorAll("[data-contact]").forEach((link) => {
    const key = link.dataset.contact;
    const url = contactUrls[key];
    if (url) {
      link.href = url;
      link.hidden = false;
      if (["linkedin", "github", "instagram", "whatsapp"].includes(key)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    } else {
      link.hidden = true;
    }
  });
  const visibleContactCards = [...document.querySelectorAll("#contact-grid [data-contact]")].some((node) => !node.hidden);
  const emptyContact = document.getElementById("contact-empty");
  if (emptyContact) emptyContact.hidden = visibleContactCards;

  function validProfileUrl(value, expectedDomain) {
    if (!value || typeof value !== "string") return "";
    try {
      const parsed = new URL(value);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
      if (!parsed.hostname.toLowerCase().endsWith(expectedDomain)) return "";
      return parsed.href;
    } catch (_) {
      return "";
    }
  }

  // Mobile navigation: toggle, select, outside click and Escape.
  function closeMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    const icon = menuToggle.querySelector("i");
    if (icon) icon.setAttribute("data-lucide", "menu");
    if (window.lucide) window.lucide.createIcons();
  }
  function openMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    const icon = menuToggle.querySelector("i");
    if (icon) icon.setAttribute("data-lucide", "x");
    if (window.lucide) window.lucide.createIcons();
  }
  menuToggle?.addEventListener("click", () => {
    navLinks?.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  navLinks?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (navLinks?.classList.contains("is-open") &&
        !navLinks.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks?.classList.contains("is-open")) {
      closeMenu();
      menuToggle?.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  // Theme toggle, persisted when browser storage is available.
  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
    themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#101311" : "#f7f8f5";
  }
  applyTheme(root.dataset.theme === "light" ? "light" : "dark");
  themeToggle?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  // Smooth in-page navigation fallback for browsers where CSS smooth scroll is unavailable.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", targetId);
    });
  });

  // Active section tracking.
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -58% 0px", threshold: 0 }) : null;
  sections.forEach((section) => sectionObserver?.observe(section));

  // Scroll-triggered reveals, with a graceful no-IntersectionObserver fallback.
  const revealNodes = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealNodes.forEach((node) => revealObserver.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  // Project filtering.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card[data-category]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
      });
    });
  });

  // Back to top and current year.
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Lucide icons are decorative when adjacent text provides the label.
  if (window.lucide) window.lucide.createIcons();
});
