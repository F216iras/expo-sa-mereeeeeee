const stepBtn = document.getElementById("stepBtn");
const stepCount = document.getElementById("stepCount");
const energyOut = document.getElementById("energyOut");
const poweredDevice = document.getElementById("poweredDevice");
const themeToggle = document.getElementById("themeToggle");
const navLinks = document.querySelectorAll(".progress-nav a");
const slides = document.querySelectorAll(".slide");
const grids = document.querySelectorAll(".grid");

let steps = 0;

function getPoweredDevice(energyMilliJoule) {
  const energy = parseFloat(energyMilliJoule);
  if (energy >= 160) return "💡 Assez pour allumer un lampadaire LED pendant 1 seconde !";
  if (energy >= 80) return "📺 Assez pour alimenter un petit ecran d'information pendant 1 seconde !";
  if (energy >= 48) return "🔆 Assez pour faire fonctionner un panneau lumineux pendant 1 seconde !";
  if (energy >= 32) return "📡 Assez pour activer un capteur connecte !";
  if (energy >= 16) return "💻 Assez pour faire clignoter un ecran de borne d'info !";
  if (energy >= 8) return "🔦 Assez pour allumer une LED puissante pendant 2 secondes !";
  if (energy >= 3.2) return "💡 Assez pour faire clignoter une LED pendant 1 seconde !";
  return "⚡ L'electricite est generee, continue pour alimenter un appareil !";
}

if (stepBtn && stepCount && energyOut && poweredDevice) {
  stepBtn.addEventListener("click", () => {
    steps += 1;
    const energyMilliJoule = (steps * 3.2).toFixed(1);
    stepCount.textContent = String(steps);
    energyOut.textContent = String(energyMilliJoule);
    poweredDevice.textContent = getPoweredDevice(energyMilliJoule);

    stepBtn.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.95)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }
      ],
      { duration: 300, easing: "ease-out" }
    );
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

slides.forEach((slide) => observer.observe(slide));

const setActiveNav = () => {
  let activeId = "slide1";

  slides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.35) {
      activeId = slide.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

grids.forEach((grid) => {
  const cards = grid.querySelectorAll(".card");
  let previousIndex = -1;

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((item) => {
        item.classList.remove("active-card", "enter-from-left", "enter-from-right");
      });

      grid.classList.add("has-focus");
      card.classList.add("active-card");

      if (previousIndex !== -1 && previousIndex !== index) {
        if (index > previousIndex) {
          card.classList.add("enter-from-right");
        } else {
          card.classList.add("enter-from-left");
        }
      }

      previousIndex = index;
    });

    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("active-card", "enter-from-left", "enter-from-right");
      if (!grid.querySelector(".card.active-card")) {
        grid.classList.remove("has-focus");
      }
    });
  });
});
