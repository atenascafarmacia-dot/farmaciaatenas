import { siteContent } from "./content.js";

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const heroVideo = document.querySelector("#heroVideo");
const promoGrid = document.querySelector("#promoGrid");

const setHeaderState = () => header?.classList.toggle("scrolled", window.scrollY > 40);
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  mainNav?.classList.toggle("open", !open);
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
  },
  { rootMargin: "-35% 0px -55%", threshold: [0.05, 0.25, 0.5] },
);
sections.forEach((section) => sectionObserver.observe(section));

if (siteContent.heroVideo && heroVideo) {
  heroVideo.src = siteContent.heroVideo;
  heroVideo.addEventListener("canplay", () => {
    heroVideo.classList.add("ready");
    heroVideo.play().catch(() => {});
  });
}

if (promoGrid) {
  promoGrid.innerHTML = siteContent.promotions
    .map(
      (promo) => `
        <article class="promo-card ${promo.featured ? "featured" : ""} reveal">
          <div class="promo-top">
            <span class="promo-label">${promo.label}</span>
            <span class="promo-icon" aria-hidden="true">${promo.icon}</span>
          </div>
          <h3>${promo.name}</h3>
          <p class="promo-offer">${promo.offer}</p>
          <p class="promo-note">${promo.note}</p>
        </article>
      `,
    )
    .join("");
  promoGrid.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

document.querySelector("#currentYear").textContent = new Date().getFullYear();
