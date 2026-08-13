/* ==========================================================
   GALLERY SLIDER
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery__slider");

  if (!gallery) return;

  const track = gallery.querySelector(".gallery__track");
  const slides = gallery.querySelectorAll(".gallery__slide");
  const prevButton = gallery.querySelector(".gallery__nav--prev");
  const nextButton = gallery.querySelector(".gallery__nav--next");

  const dots = document.querySelectorAll(".gallery__dot");

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoSlide = null;

  /* ======================================================
       UPDATE
    ====================================================== */

  function updateGallery() {
    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
    });
  }

  /* ======================================================
       NEXT
    ====================================================== */

  function nextSlide() {
    current++;

    if (current >= slides.length) {
      current = 0;
    }

    updateGallery();
  }

  /* ======================================================
       PREVIOUS
    ====================================================== */

  function prevSlide() {
    current--;

    if (current < 0) {
      current = slides.length - 1;
    }

    updateGallery();
  }

  /* ======================================================
       BUTTON
    ====================================================== */

  nextButton?.addEventListener("click", (event) => {
    event.preventDefault();

    nextSlide();

    restartAuto();
  });

  prevButton?.addEventListener("click", (event) => {
    event.preventDefault();

    prevSlide();

    restartAuto();
  });

  /* ======================================================
       DOT
    ====================================================== */

  dots.forEach((dot, index) => {
    dot.addEventListener("click", (event) => {
      event.preventDefault();

      current = index;

      updateGallery();

      restartAuto();
    });
  });

  /* ======================================================
       AUTO SLIDE
    ====================================================== */

  function startAuto() {
    stopAuto();

    autoSlide = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  function stopAuto() {
    if (autoSlide) {
      clearInterval(autoSlide);

      autoSlide = null;
    }
  }

  function restartAuto() {
    stopAuto();

    startAuto();
  }

  /* ======================================================
       TOUCH SWIPE
    ====================================================== */

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;

      stopAuto();
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;

      const distance = touchStartX - touchEndX;

      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      startAuto();
    },
    { passive: true },
  );

  /* ======================================================
       MOUSE
    ====================================================== */

  gallery.addEventListener("mouseenter", () => {
    stopAuto();
  });

  gallery.addEventListener("mouseleave", () => {
    startAuto();
  });

  /* ======================================================
       INIT
    ====================================================== */

  updateGallery();

  startAuto();
});
