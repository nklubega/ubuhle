/* ========================================
script.js
======================================== */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const body = document.body;

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const parallaxItems = document.querySelectorAll("[data-parallax]");

function handleParallax() {
  const scrollY = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.getAttribute("data-parallax")) || 0;
    item.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

window.addEventListener("scroll", handleParallax, { passive: true });
handleParallax();

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your inquiry form is currently a front-end design. I can help you connect it to WhatsApp, Formspree, or EmailJS next.");
  });
}
