/* ==========================================================
   ACCOUNT
========================================================== */

const accountItems = document.querySelectorAll(".account__item");

/* ==========================================================
   ACCORDION
========================================================== */

accountItems.forEach((item) => {
  const header = item.querySelector(".account__header");
  const body = item.querySelector(".account__body");

  header.addEventListener("click", () => {
    const opened = item.classList.contains("active");

    accountItems.forEach((target) => {
      target.classList.remove("active");

      target.querySelector(".account__body").style.maxHeight = null;

      target.querySelector(".account__header span:last-child").textContent =
        "+";
    });

    if (!opened) {
      item.classList.add("active");

      body.style.maxHeight = body.scrollHeight + "px";

      header.querySelector("span:last-child").textContent = "−";
    }
  });
});

/* ==========================================================
   COPY ACCOUNT
========================================================== */

document.querySelectorAll(".account__copy").forEach((button) => {
  button.addEventListener("click", async () => {
    const account = button.dataset.account;

    try {
      await navigator.clipboard.writeText(account);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = account;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      textarea.remove();
    }

    if (typeof showToast === "function") {
      showToast("계좌번호가 복사되었습니다.");
    } else {
      alert("계좌번호가 복사되었습니다.");
    }
  });
});
