import { siteContent } from "./content.js";

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const heroVideo = document.querySelector("#heroVideo");
const promoGrid = document.querySelector("#promoGrid");
const promoPrev = document.querySelector("#promoPrev");
const promoNext = document.querySelector("#promoNext");
const promoDots = document.querySelector("#promoDots");
const promoLightbox = document.querySelector("#promoLightbox");
const promoLightboxMedia = document.querySelector("#promoLightboxMedia");
const promoLightboxLabel = document.querySelector("#promoLightboxLabel");
const promoLightboxTitle = document.querySelector("#promoLightboxTitle");
const promoLightboxNote = document.querySelector("#promoLightboxNote");
const promoLightboxClose = document.querySelector("#promoLightboxClose");
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
      (promo, index) => {
        const media = promo.type === "video"
          ? `<video class="promo-media" muted loop playsinline preload="metadata" controls aria-label="${promo.name}">
               <source src="${promo.src}" type="video/mp4" />
             </video>`
          : `<img class="promo-media" src="${promo.src}" alt="${promo.alt}" loading="lazy" />`;

        return `
        <article class="promo-card promo-card-${promo.type} reveal" tabindex="0" role="button" aria-label="Ver promoción ${promo.name}" data-promo-index="${index}">
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

  if (promoDots) {
    promoDots.innerHTML = siteContent.promotions
      .map((promo, index) => `<button type="button" aria-label="Ir a ${promo.name}" data-promo-dot="${index}"></button>`)
      .join("");
  }

  const cards = [...promoGrid.querySelectorAll(".promo-card")];
  const dots = [...document.querySelectorAll("[data-promo-dot]")];

  const updatePromoDots = () => {
    const gridLeft = promoGrid.getBoundingClientRect().left;
    const nearest = cards
      .map((card, index) => ({ index, distance: Math.abs(card.getBoundingClientRect().left - gridLeft) }))
      .sort((a, b) => a.distance - b.distance)[0];

    dots.forEach((dot, index) => dot.classList.toggle("active", index === nearest?.index));
  };

  const scrollToPromo = (index) => cards[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });

  const getActivePromoIndex = () => {
    const activeDot = dots.findIndex((dot) => dot.classList.contains("active"));
    return activeDot >= 0 ? activeDot : 0;
  };

  promoPrev?.addEventListener("click", () => scrollToPromo(Math.max(getActivePromoIndex() - 1, 0)));
  promoNext?.addEventListener("click", () => scrollToPromo(Math.min(getActivePromoIndex() + 1, cards.length - 1)));
  dots.forEach((dot, index) => dot.addEventListener("click", () => scrollToPromo(index)));
  promoGrid.addEventListener("scroll", () => requestAnimationFrame(updatePromoDots), { passive: true });
  window.addEventListener("resize", updatePromoDots);
  updatePromoDots();

  const openPromoLightbox = (index) => {
    const promo = siteContent.promotions[index];
    if (!promo || !promoLightbox || !promoLightboxMedia) return;

    promoLightboxMedia.innerHTML = promo.type === "video"
      ? `<video class="promo-lightbox-file" controls autoplay playsinline>
           <source src="${promo.src}" type="video/mp4" />
         </video>`
      : `<img class="promo-lightbox-file" src="${promo.src}" alt="${promo.alt}" />`;
    promoLightboxLabel.textContent = promo.label;
    promoLightboxTitle.textContent = promo.name;
    promoLightboxNote.textContent = promo.note;
    promoLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    promoLightboxClose?.focus();
  };

  const closePromoLightbox = () => {
    if (!promoLightbox || !promoLightboxMedia) return;
    promoLightbox.setAttribute("aria-hidden", "true");
    promoLightboxMedia.innerHTML = "";
    document.body.classList.remove("lightbox-open");
  };

  cards.forEach((card) => {
    const index = Number(card.dataset.promoIndex);
    card.addEventListener("click", (event) => {
      if (event.target.closest("video")) return;
      openPromoLightbox(index);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPromoLightbox(index);
    });
  });

  promoLightboxClose?.addEventListener("click", closePromoLightbox);
  promoLightbox?.addEventListener("click", (event) => {
    if (event.target === promoLightbox) closePromoLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && promoLightbox?.getAttribute("aria-hidden") === "false") closePromoLightbox();
  });

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
