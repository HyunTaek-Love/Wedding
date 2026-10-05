const userAgent = navigator.userAgent || "";

const isKakaoTalk = /KAKAOTALK/i.test(userAgent);

if (isKakaoTalk) {
  document.documentElement.classList.add("kakao-browser");
}
