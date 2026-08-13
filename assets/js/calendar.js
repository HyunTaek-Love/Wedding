document.addEventListener("DOMContentLoaded", () => {
  const calendarDays = document.getElementById("calendarDays");
  const calendarMonth = document.querySelector(".calendar__month");

  if (!calendarDays || !calendarMonth) {
    return;
  }

  // ==========================================================
  // 결혼식 날짜
  // ==========================================================

  const weddingYear = 2027;
  const weddingMonth = 1; // 0 = 1월, 1 = 2월
  const weddingDay = 20;

  // ==========================================================
  // 월 표시
  // ==========================================================

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  calendarMonth.textContent = `${monthNames[weddingMonth]} ${weddingYear}`;

  // ==========================================================
  // 기존 날짜 제거
  // ==========================================================

  calendarDays.innerHTML = "";

  // ==========================================================
  // 해당 월의 첫 번째 요일
  // ==========================================================

  const firstDay = new Date(weddingYear, weddingMonth, 1).getDay();

  // ==========================================================
  // 해당 월의 마지막 날짜
  // ==========================================================

  const lastDate = new Date(weddingYear, weddingMonth + 1, 0).getDate();

  // ==========================================================
  // 첫 주 빈칸
  // ==========================================================

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");

    emptyDay.className = "calendar__day calendar__day--empty";

    calendarDays.appendChild(emptyDay);
  }

  // ==========================================================
  // 날짜 생성
  // ==========================================================

  for (let day = 1; day <= lastDate; day++) {
    const dayElement = document.createElement("div");

    dayElement.className = "calendar__day";

    // 날짜 숫자
    const numberElement = document.createElement("span");

    numberElement.className = "calendar__number";

    numberElement.textContent = day;

    dayElement.appendChild(numberElement);

    // ======================================================
    // 결혼식 날짜
    // ======================================================

    if (day === weddingDay) {
      dayElement.classList.add("calendar__day--wedding");

      const heart = document.createElement("span");

      heart.className = "calendar__heart";

      heart.textContent = "♥";

      dayElement.appendChild(heart);
    }

    calendarDays.appendChild(dayElement);
  }

  // ==========================================================
  // 안내 문구
  // ==========================================================

  const notice = document.getElementById("calendarNotice");

  if (notice) {
    notice.textContent = "2027년 2월 20일, 우리의 특별한 날";
  }
});
