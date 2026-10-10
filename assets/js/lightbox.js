document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeButton = document.getElementById("lightboxClose");
  const prevButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  if (!lightbox || !lightboxImage) return;

  // 무한 루프용 복제 사진은 제외하고 원본 사진만 사용
  const galleryImages = Array.from(
    document.querySelectorAll(".gallery__slide img"),
  ).filter((image) => {
    return !image.closest(".gallery__slide--clone");
  });

  if (galleryImages.length === 0) return;

  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let validTouchStart = false;

  function openLightbox(index) {
    if (index < 0 || index >= galleryImages.length) return;

    currentIndex = index;
    updateLightbox();

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";

    // 닫기 애니메이션이 끝난 후 이미지 리소스 제거
    window.setTimeout(() => {
      if (!lightbox.classList.contains("show")) {
        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";
      }
    }, 350);
  }

  function updateLightbox() {
    const image = galleryImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "웨딩 사진";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
  }

  function prevImage() {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    updateLightbox();
  }

  // 원본 사진 클릭 이벤트는 한 번만 등록
  galleryImages.forEach((image, index) => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  // 버튼 이벤트도 각각 한 번만 등록
  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", prevImage);
  nextButton?.addEventListener("click", nextImage);

  // 배경을 눌렀을 때 닫기
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // 키보드 조작
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "ArrowRight") {
      nextImage();
    }
  });

  // 모바일: 한 손가락 좌우 스와이프만 사진 넘김으로 처리
  lightbox.addEventListener(
    "touchstart",
    (event) => {
      if (!lightbox.classList.contains("show")) return;

      // 두 손가락 이상이면 스와이프 동작을 시작하지 않음
      if (event.touches.length !== 1) {
        validTouchStart = false;
        return;
      }

      validTouchStart = true;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true },
  );

  // 핀치 줌 차단: 두 손가락 이상 움직일 때 기본 확대 동작 방지
  lightbox.addEventListener(
    "touchmove",
    (event) => {
      if (lightbox.classList.contains("show") && event.touches.length > 1) {
        event.preventDefault();
        validTouchStart = false;
      }
    },
    { passive: false },
  );

  lightbox.addEventListener(
    "touchend",
    (event) => {
      if (
        !lightbox.classList.contains("show") ||
        !validTouchStart ||
        event.changedTouches.length !== 1
      ) {
        validTouchStart = false;
        return;
      }

      const dx = touchStartX - event.changedTouches[0].clientX;
      const dy = touchStartY - event.changedTouches[0].clientY;

      validTouchStart = false;

      // 세로 스크롤이나 작은 움직임은 무시
      if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) {
        return;
      }

      if (dx > 0) {
        nextImage();
      } else {
        prevImage();
      }
    },
    { passive: true },
  );

  // iOS Safari의 별도 핀치 제스처 이벤트도 차단
  ["gesturestart", "gesturechange", "gestureend"].forEach((type) => {
    lightbox.addEventListener(
      type,
      (event) => {
        if (lightbox.classList.contains("show")) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  });

  // 이미지 드래그로 브라우저 기본 동작이 발생하는 것 방지
  lightboxImage.draggable = false;
});
