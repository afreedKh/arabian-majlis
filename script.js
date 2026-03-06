// ─── NAV SCROLL ───
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("scrolled", window.scrollY > 60),
);

// ─── MOBILE NAV ───
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("open");
}

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
    document.getElementById("mobileNav").classList.remove("open");
  });
});

// ─── FADE-UP INTERSECTION OBSERVER ───
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));

// ─── STAGGER DISH CARDS ───
document
  .querySelectorAll(".dish-card")
  .forEach((c, i) => (c.style.transitionDelay = `${i * 0.1}s`));

// ─── NATIVE LAZY LOADING FALLBACK (for older browsers) ───
if ("loading" in HTMLImageElement.prototype === false) {
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImgs.forEach((img) => imgObserver.observe(img));
}
