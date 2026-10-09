/* ==========================================================
   LOCATION
========================================================== */

const copyButton = document.getElementById("copyAddress");

const address = "인천 부평구 체육관로 60 삼산월드컨벤션 웨딩홀";

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(address);

    showToast("📋 주소가 복사되었습니다.");
  } catch (error) {
    const textarea = document.createElement("textarea");

    textarea.value = address;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showToast("📋 주소가 복사되었습니다.");
  }
});

/* ==========================================================
   TOAST
========================================================== */

function showToast(message) {
  const oldToast = document.querySelector(".toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}
