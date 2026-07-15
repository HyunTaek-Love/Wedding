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

async function playMusic() {
  if (!bgm) return;

  try {
    await bgm.play();

    playing = true;

    musicButton.textContent = "🔊";
  } catch (e) {
    console.log("Autoplay blocked.");
  }
}

function pauseMusic() {
  if (!bgm) return;

  bgm.pause();

  playing = false;

  musicButton.textContent = "🎵";
}

musicButton?.addEventListener("click", () => {
  if (playing) {
    pauseMusic();
  } else {
    playMusic();
  }
});

/* ==========================================================
   FIRST USER INTERACTION
========================================================== */

function firstInteraction() {
  if (!playing) {
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
