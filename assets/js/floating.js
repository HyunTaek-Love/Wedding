/* ==========================================================
   FLOATING
========================================================== */

const musicButton = document.getElementById("musicButton");
const topButton = document.getElementById("topButton");
const bgm = document.getElementById("bgm");

let playing = false;

/* ==========================================================
   MUSIC
========================================================== */

function updateMusicButton() {
  if (!musicButton || !bgm) return;

  const isPlaying = !bgm.paused;

  musicButton.classList.toggle("is-playing", isPlaying);
  musicButton.setAttribute(
    "aria-label",
    isPlaying ? "배경음악 정지" : "배경음악 재생",
  );

  playing = isPlaying;
}

async function playMusic() {
  if (!bgm) return;

  try {
    await bgm.play();
    updateMusicButton();
  } catch (e) {
    updateMusicButton();
    console.log("Autoplay blocked.");
  }
}

function pauseMusic() {
  if (!bgm) return;

  bgm.pause();
  updateMusicButton();
}

musicButton?.addEventListener("click", () => {
  if (bgm && !bgm.paused) {
    pauseMusic();
  } else {
    playMusic();
  }
});

/* 실제 오디오 상태와 파형 동기화 */
bgm?.addEventListener("play", updateMusicButton);
bgm?.addEventListener("pause", updateMusicButton);
bgm?.addEventListener("ended", updateMusicButton);

/* ==========================================================
   FIRST USER INTERACTION
========================================================== */

function firstInteraction() {
  if (bgm?.paused) {
    playMusic();
  }

  document.removeEventListener("click", firstInteraction);
  document.removeEventListener("touchstart", firstInteraction);
}

document.addEventListener("click", firstInteraction);
document.addEventListener("touchstart", firstInteraction);

/* ==========================================================
   TOP BUTTON
========================================================== */

topButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/* ==========================================================
   SHOW / HIDE
========================================================== */

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topButton.style.opacity = "1";

    topButton.style.pointerEvents = "auto";
  } else {
    topButton.style.opacity = "0";

    topButton.style.pointerEvents = "none";
  }
});
