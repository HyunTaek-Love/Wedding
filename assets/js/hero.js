/* ==========================================================
   Wedding Hero
========================================================== */

const weddingDate = new Date("2027-05-15T14:00:00");

const hero = document.querySelector(".hero");
const background = document.querySelector(".hero__background");
const dday = document.querySelector(".hero__dday");
const scroll = document.querySelector(".hero__scroll");

/* ==========================================================
   D-Day
========================================================== */

function updateDday() {
  if (!dday) return;

  const today = new Date();

  const diff = weddingDate - today;

  const day = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (day > 0) {
    dday.textContent = `D - ${day}`;
  } else if (day === 0) {
    dday.textContent = "💍 TODAY";
  } else {
    dday.textContent = "Wedding Day";
  }
}

updateDday();

/* ==========================================================
   Scroll
========================================================== */

scroll?.addEventListener("click", () => {
  document.querySelector("#invitation").scrollIntoView({
    behavior: "smooth",
  });
});

/* ==========================================================
   Mouse Parallax
========================================================== */

hero?.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 25;

  const y = (e.clientY / window.innerHeight - 0.5) * 25;

  background.style.transform = `translate(${x}px,${y}px) scale(1.08)`;
});

hero?.addEventListener("mouseleave", () => {
  background.style.transform = "translate(0,0) scale(1.05)";
});

/* ==========================================================
   Sakura
========================================================== */

const sakuraCount = 18;

for (let i = 0; i < sakuraCount; i++) {
  const petal = document.createElement("span");

  petal.className = "sakura";

  petal.style.left = Math.random() * 100 + "%";

  petal.style.animationDelay = Math.random() * 12 + "s";

  petal.style.animationDuration = 10 + Math.random() * 10 + "s";

  petal.style.opacity = 0.3 + Math.random() * 0.7;

  petal.style.transform = `scale(${0.5 + Math.random()})`;

  hero.appendChild(petal);
}
