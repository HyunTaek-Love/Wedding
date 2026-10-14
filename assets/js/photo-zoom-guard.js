(() => {
  const gallery = document.querySelector("#gallery");
  if (!gallery) return;

  let pinchStarted = false;
  let startDistance = 0;

  function distance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  gallery.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length === 2) {
        pinchStarted = true;
        startDistance = distance(event.touches);
      }
    },
    { passive: true },
  );

  gallery.addEventListener(
    "touchmove",
    (event) => {
      if (!pinchStarted || event.touches.length !== 2) return;

      const currentDistance = distance(event.touches);

      // 두 손가락 사이의 거리가 변하면 확대/축소 동작으로 판단
      if (Math.abs(currentDistance - startDistance) > 8) {
        gallery.classList.add("photo-zoom-blurred");
      }
    },
    { passive: true },
  );

  function checkZoom() {
    if (!pinchStarted) return;

    const scale = window.visualViewport?.scale ?? 1;

    // 페이지가 기본 배율로 돌아오면 사진 흐림 해제
    if (scale <= 1.01) {
      gallery.classList.remove("photo-zoom-blurred");
      pinchStarted = false;
    }
  }

  gallery.addEventListener(
    "touchend",
    () => {
      if (gallery.classList.contains("photo-zoom-blurred")) {
        // 확대 배율이 유지되면 흐림 상태 유지
        setTimeout(checkZoom, 100);
      } else {
        pinchStarted = false;
      }
    },
    { passive: true },
  );

  window.visualViewport?.addEventListener("resize", checkZoom);
})();
