musicButton.classList.toggle("is-playing", isPlaying);
musicButton.setAttribute(
  "aria-label",
  isPlaying ? "배경음악 정지" : "배경음악 재생",
);
