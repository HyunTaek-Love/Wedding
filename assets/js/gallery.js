/* ==========================================================
   GALLERY SLIDER
========================================================== */

const track = document.querySelector(".gallery__track");
const slides = document.querySelectorAll(".gallery__slide");
const dots = document.querySelectorAll(".gallery__dot");
const prev = document.querySelector(".gallery__nav--prev");
const next = document.querySelector(".gallery__nav--next");

let current = 0;
let autoSlide;

/* ==========================================================
   UPDATE
========================================================== */

function updateGallery() {
  track.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === current);
  });
}

/* ==========================================================
   NEXT
========================================================== */

function nextSlide() {
  current++;

  if (current >= slides.length) {
    current = 0;
  }

  updateGallery();
}

/* ==========================================================
   PREV
========================================================== */

function prevSlide() {
  current--;

  if (current < 0) {
    current = slides.length - 1;
  }

  updateGallery();
}

/* ==========================================================
   BUTTON
========================================================== */

next?.addEventListener("click", () => {
  nextSlide();

  restartAuto();
});

prev?.addEventListener("click", () => {
  prevSlide();

  restartAuto();
});

/* ==========================================================
   DOT
========================================================== */

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    current = index;

    updateGallery();

    restartAuto();
  });
});

/* ==========================================================
   AUTO
========================================================== */

function startAuto() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 4000);
}

function restartAuto() {
  clearInterval(autoSlide);

  startAuto();
}

startAuto();

/* ==========================================================
   TOUCH
========================================================== */

let startX = 0;

let endX = 0;

track?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track?.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

track?.addEventListener("touchend", () => {
  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    nextSlide();
  } else {
    prevSlide();
  }

  restartAuto();
});

/* ==========================================================
   PAUSE
========================================================== */

track?.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

track?.addEventListener("mouseleave", () => {
  startAuto();
});

/* ==========================================================
   INIT
========================================================== */

updateGallery();
