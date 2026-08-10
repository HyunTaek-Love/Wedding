/* ==========================================================
   LIGHTBOX
========================================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = [...document.querySelectorAll(".gallery__slide img")];

let currentImageIndex = 0;

/* ==========================================================
   OPEN
========================================================== */

function openLightbox(index) {
  currentImageIndex = index;

  lightboxImage.src = galleryImages[index].src;
  lightboxImage.alt = galleryImages[index].alt;

  lightbox.classList.add("show");

  document.body.style.overflow = "hidden";
}

/* ==========================================================
   CLOSE
========================================================== */

function closeLightbox() {
  lightbox.classList.remove("show");

  document.body.style.overflow = "";
}

/* ==========================================================
   UPDATE
========================================================== */

function updateLightbox() {
  lightboxImage.src = galleryImages[currentImageIndex].src;

  lightboxImage.alt = galleryImages[currentImageIndex].alt;
}

/* ==========================================================
   NEXT / PREV
========================================================== */

function nextImage() {
  currentImageIndex++;

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  updateLightbox();
}

function prevImage() {
  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }

  updateLightbox();
}

/* ==========================================================
   IMAGE CLICK
========================================================== */

galleryImages.forEach((image, index) => {
  image.style.cursor = "zoom-in";

  image.addEventListener("click", () => {
    openLightbox(index);
  });
});

/* ==========================================================
   BUTTON
========================================================== */

lightboxNext?.addEventListener("click", nextImage);

lightboxPrev?.addEventListener("click", prevImage);

lightboxClose?.addEventListener("click", closeLightbox);

/* ==========================================================
   BACKGROUND CLICK
========================================================== */

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/* ==========================================================
   KEYBOARD
========================================================== */

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  switch (e.key) {
    case "Escape":
      closeLightbox();

      break;

    case "ArrowRight":
      nextImage();

      break;

    case "ArrowLeft":
      prevImage();

      break;
  }
});

/* ==========================================================
   SWIPE
========================================================== */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

lightbox.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", () => {
  const distance = touchStartX - touchEndX;

  if (Math.abs(distance) < 50) return;

  if (distance > 0) {
    nextImage();
  } else {
    prevImage();
  }
});
