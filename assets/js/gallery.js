/* ==========================================================
   GALLERY SLIDER - SEAMLESS INFINITE LOOP
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery__slider");
  if (!gallery) return;

  const track = gallery.querySelector(".gallery__track");
  const prevButton = gallery.querySelector(".gallery__nav--prev");
  const nextButton = gallery.querySelector(".gallery__nav--next");
  const dots = document.querySelectorAll(".gallery__dot");

  if (!track) return;

  const originalSlides = Array.from(track.querySelectorAll(".gallery__slide"));

  const total = originalSlides.length;
  if (total < 2) return;

  // 마지막 사진 복제본을 맨 앞에,
  // 첫 사진 복제본을 맨 뒤에 추가
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[total - 1].cloneNode(true);

  firstClone.classList.add("gallery__slide--clone");
  lastClone.classList.add("gallery__slide--clone");

  firstClone.setAttribute("aria-hidden", "true");
  lastClone.setAttribute("aria-hidden", "true");

  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);

  // 복제 사진을 클릭하면 원본 사진의 확대 보기 실행
  lastClone.querySelector("img")?.addEventListener("click", () => {
    originalSlides[total - 1].querySelector("img")?.click();
  });

  firstClone.querySelector("img")?.addEventListener("click", () => {
    originalSlides[0].querySelector("img")?.click();
  });

  // 실제 첫 사진은 인덱스 1
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

  function updateDots() {
    const realIndex = (current - 1 + total) % total;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === realIndex);
    });
  }

  function goTo(index) {
    if (isAnimating) return;

    current = index;
    isAnimating = true;

    setPosition(true);
    updateDots();
  }

  function nextSlide() {
    goTo(current + 1);
  }

  function prevSlide() {
    goTo(current - 1);
  }

  // 복제 사진에 도착한 후 원본 위치로 순간 이동.
  // transition을 끄므로 역방향으로 사진이 지나가지 않음.
  track.addEventListener("transitionend", (event) => {
    if (event.target !== track || event.propertyName !== "transform") {
      return;
    }

    if (current === total + 1) {
      current = 1;
      setPosition(false);
    } else if (current === 0) {
      current = total;
      setPosition(false);
    }

    updateDots();
    isAnimating = false;
  });

  // 버튼
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

  // 페이지 점
  dots.forEach((dot, index) => {
    dot.addEventListener("click", (event) => {
      event.preventDefault();
      if (index >= total || isAnimating) return;

      stopAuto();
      goTo(index + 1);
      restartAuto();
    });
  });

  // 자동 넘김
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

  // 모바일 스와이프
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

      // 세로 스크롤은 방해하지 않고 가로 스와이프만 처리
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

  // 마우스가 갤러리 위에 있으면 자동 넘김 정지
  gallery.addEventListener("mouseenter", stopAuto);
  gallery.addEventListener("mouseleave", startAuto);

  // 초기 위치
  setPosition(false);
  updateDots();
  startAuto();
});
