import { siteContent } from "./content.js";

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const heroVideo = document.querySelector("#heroVideo");
const promoGrid = document.querySelector("#promoGrid");
const pharmacyCursor = document.querySelector("#pharmacyCursor");

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
      (promo) => {
        const media = promo.type === "video"
          ? `<video class="promo-media" muted loop playsinline preload="metadata" controls aria-label="${promo.name}">
               <source src="${promo.src}" type="video/mp4" />
             </video>`
          : `<img class="promo-media" src="${promo.src}" alt="${promo.alt}" loading="lazy" />`;

        return `
        <article class="promo-card promo-card-${promo.type} reveal">
          <div class="promo-media-wrap">${media}</div>
          <div class="promo-body">
            <span class="promo-label">${promo.label}</span>
            <h3>${promo.name}</h3>
            <p class="promo-note">${promo.note}</p>
          </div>
        </article>
      `;
      },
    )
    .join("");
  promoGrid.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const promoVideoObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.play().catch(() => {});
      else entry.target.pause();
    }),
    { threshold: 0.55 },
  );
  promoGrid.querySelectorAll("video").forEach((video) => promoVideoObserver.observe(video));

  const requestedSection = document.getElementById(window.location.hash.slice(1));
  if (requestedSection) requestAnimationFrame(() => requestedSection.scrollIntoView());
}

if (pharmacyCursor && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    pharmacyCursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    pharmacyCursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    pharmacyCursor.classList.add("visible");
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    pharmacyCursor.classList.toggle("active", Boolean(event.target.closest("a, button, video[controls]")));
  });

  document.documentElement.addEventListener("mouseleave", () => pharmacyCursor.classList.remove("visible"));
}

document.querySelector("#currentYear").textContent = new Date().getFullYear();
