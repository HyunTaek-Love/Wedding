document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery__slider");
  const thumbnails = document.getElementById("galleryThumbnails");

  if (!gallery || !thumbnails) return;

  const track = gallery.querySelector(".gallery__track");
  const prevButton = gallery.querySelector(".gallery__nav--prev");
  const nextButton = gallery.querySelector(".gallery__nav--next");

  if (!track) return;

  const originalSlides = Array.from(track.querySelectorAll(".gallery__slide"));

  const total = originalSlides.length;

  if (total < 2) return;

  // 실제 사진을 기준으로 썸네일 생성
  thumbnails.innerHTML = "";

  const thumbnailButtons = originalSlides.map((slide, index) => {
    const originalImage = slide.querySelector("img");
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.className = "gallery__thumbnail";
    button.setAttribute("aria-label", `${index + 1}번째 사진 보기`);

    image.src = originalImage.src;
    image.alt = "";
    image.loading = "lazy";
    image.draggable = false;

    button.appendChild(image);
    thumbnails.appendChild(button);

    button.addEventListener("click", () => {
      stopAuto();

      goTo(index + 1);

      restartAuto();
    });

    return button;
  });

  // 무한 루프용 앞뒤 복제 사진
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[total - 1].cloneNode(true);

  firstClone.classList.add("gallery__slide--clone");
  lastClone.classList.add("gallery__slide--clone");

  firstClone.setAttribute("aria-hidden", "true");
  lastClone.setAttribute("aria-hidden", "true");

  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);

  // 복제 사진을 눌러도 원본 사진의 확대 보기가 열리도록 연결
  firstClone.querySelector("img")?.addEventListener("click", () => {
    originalSlides[0].querySelector("img")?.click();
  });

  lastClone.querySelector("img")?.addEventListener("click", () => {
    originalSlides[total - 1].querySelector("img")?.click();
  });

  let current = 1;
  let autoSlide = null;
  let isAnimating = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const transitionValue = "transform 0.45s ease";

  function setPosition(animate = true) {
    track.style.transition = animate ? transitionValue : "none";
    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
  }

  function getRealIndex() {
    return (current - 1 + total) % total;
  }

  function updateThumbnails() {
    const realIndex = getRealIndex();

    thumbnailButtons.forEach((button, index) => {
      const active = index === realIndex;

      button.classList.toggle("active", active);

      if (active) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    // 현재 썸네일이 보이는 영역의 가운데로 이동
    const activeButton = thumbnailButtons[realIndex];

    if (activeButton) {
      const targetLeft =
        activeButton.offsetLeft -
        (thumbnails.clientWidth - activeButton.clientWidth) / 2;

      thumbnails.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  }

  function goTo(index) {
    if (isAnimating) return;

    current = index;
    isAnimating = true;

    setPosition(true);
    updateThumbnails();
  }

  function nextSlide() {
    goTo(current + 1);
  }

  function prevSlide() {
    goTo(current - 1);
  }

  // 복제 사진에 도착하면 원본 위치로 자연스럽게 이어 붙임
  track.addEventListener("transitionend", (event) => {
    if (event.target !== track || event.propertyName !== "transform") {
      return;
    }

    if (current === total + 1) {
      current = 1;
      setPosition(false);
      track.offsetHeight;
    } else if (current === 0) {
      current = total;
      setPosition(false);
      track.offsetHeight;
    }

    isAnimating = false;
    updateThumbnails();
  });

  nextButton?.addEventListener("click", (event) => {
    event.preventDefault();

    stopAuto();
    nextSlide();
    restartAuto();
  });

  prevButton?.addEventListener("click", (event) => {
    event.preventDefault();

    stopAuto();
    prevSlide();
    restartAuto();
  });

  function startAuto() {
    stopAuto();

    autoSlide = setInterval(() => {
      if (!isAnimating) nextSlide();
    }, 4000);
  }

  function stopAuto() {
    if (autoSlide !== null) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  function restartAuto() {
    startAuto();
  }

  track.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;

      stopAuto();
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (event) => {
      const dx = touchStartX - event.changedTouches[0].clientX;

      const dy = touchStartY - event.changedTouches[0].clientY;

      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      restartAuto();
    },
    { passive: true },
  );

  gallery.addEventListener("mouseenter", stopAuto);
  gallery.addEventListener("mouseleave", startAuto);

  // 초기 위치는 첫 번째 원본 사진
  setPosition(false);
  updateThumbnails();
  startAuto();
});
