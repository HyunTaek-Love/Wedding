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

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeButton = document.getElementById("lightboxClose");
  const prevButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  const galleryImages = [...document.querySelectorAll(".gallery__slide img")];

  if (!lightbox || !lightboxImage || galleryImages.length === 0) {
    return;
  }

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;

    lightboxImage.src = galleryImages[currentIndex].src;

    lightboxImage.alt = galleryImages[currentIndex].alt;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("show");

    document.body.style.overflow = "";

    // 닫을 때 이미지 제거
    setTimeout(() => {
      if (!lightbox.classList.contains("show")) {
        lightboxImage.removeAttribute("src");
      }
    }, 350);
  }

  function showNext() {
    currentIndex++;

    if (currentIndex >= galleryImages.length) {
      currentIndex = 0;
    }

    lightboxImage.src = galleryImages[currentIndex].src;

    lightboxImage.alt = galleryImages[currentIndex].alt;
  }

  function showPrevious() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = galleryImages.length - 1;
    }

    lightboxImage.src = galleryImages[currentIndex].src;

    lightboxImage.alt = galleryImages[currentIndex].alt;
  }

  /* 사진 클릭 */

  galleryImages.forEach((image, index) => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  /* 버튼 */

  closeButton?.addEventListener("click", closeLightbox);

  prevButton?.addEventListener("click", showPrevious);

  nextButton?.addEventListener("click", showNext);

  /* 배경 클릭 */

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  /* ESC */

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }
  });
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
