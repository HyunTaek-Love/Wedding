/* ==========================================================
   SHARE
========================================================== */

const kakaoButton = document.getElementById("kakaoShareButton");
const webShareButton = document.getElementById("webShareButton");
const copyLinkButton = document.getElementById("copyLinkButton");

/* ==========================================================
   CONFIG
   ↓↓↓ 나중에 실제 값으로 변경
========================================================== */

const SHARE = {
  title: "홍길동 ♥ 김영희 결혼합니다.",

  description: "2027년 5월 15일 오후 2시\n소중한 날에 함께해 주세요.",

  image: window.location.origin + "/assets/images/og.jpg",

  url: window.location.href,
};

/* ==========================================================
   COPY LINK
========================================================== */

copyLinkButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(SHARE.url);

    showToast("🔗 링크가 복사되었습니다.");
  } catch {
    const textarea = document.createElement("textarea");

    textarea.value = SHARE.url;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showToast("🔗 링크가 복사되었습니다.");
  }
});

/* ==========================================================
   WEB SHARE
========================================================== */

webShareButton?.addEventListener("click", async () => {
  if (!navigator.share) {
    showToast("공유 기능을 지원하지 않는 브라우저입니다.");

    return;
  }

  try {
    await navigator.share({
      title: SHARE.title,

      text: SHARE.description,

      url: SHARE.url,
    });
  } catch {
    /* 사용자가 취소 */
  }
});

/* ==========================================================
   KAKAO SHARE
========================================================== */

kakaoButton?.addEventListener("click", () => {
  if (typeof Kakao === "undefined") {
    showToast("카카오 SDK가 연결되지 않았습니다.");

    return;
  }

  if (!Kakao.isInitialized()) {
    Kakao.init("YOUR_JAVASCRIPT_KEY");
  }

  Kakao.Share.sendDefault({
    objectType: "feed",

    content: {
      title: SHARE.title,

      description: SHARE.description,

      imageUrl: SHARE.image,

      link: {
        mobileWebUrl: SHARE.url,

        webUrl: SHARE.url,
      },
    },

    buttons: [
      {
        title: "청첩장 보기",

        link: {
          mobileWebUrl: SHARE.url,

          webUrl: SHARE.url,
        },
      },
    ],
  });
});
