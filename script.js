const fullSchedule = {
  "Dushanba": [
      { time: "14:20-15:40", subject: "Geometriya", type: "Ma'ruza", instructor: "JURAYEV T. F.", group: "2-12 Fizika-matematika" },
      { time: "15:50-17:05", subject: "Matematika o'qitish metodikasi", type: "Ma'ruza", instructor: "SAYDALIYEVA F. X.", group: "2-12 Fizika-matematika" },
      { time: "17:20-18:40", subject: "Matematika o'qitish metodikasi", type: "Amaliy", instructor: "SAYDALIYEVA F. X.", group: "2-12 Fizika-matematika" }
  ],
  "Chorshanba": [
      { time: "14:20-15:40", subject: "Algebra va sonlar nazariyasi", type: "Amaliy", instructor: "TURSUNOVA Z. O.", group: "2-12 Fizika-matematika" },
      { time: "15:50-17:05", subject: "Funksiyalar nazariyasi", type: "Ma'ruza", instructor: "TURGUNBAYEV R. M.", group: "2-12 Fizika-matematika" },
      { time: "17:20-18:40", subject: "Funksiyalar nazariyasi", type: "Amaliy", instructor: "KOSHNAZAROV R. A.", group: "2-12 Fizika-matematika" }
  ],
  "Payshanba": [
      { time: "14:20-15:40", subject: "Ma'lumotlar bazasi", type: "Ma'ruza", instructor: "TUXTAMATOV X. R.", group: "2-12 Fizika-matematika" },
      { time: "15:50-17:05", subject: "Ehtimollar nazariyasi", type: "Ma'ruza", instructor: "YODGAROV S. J.", group: "2-12 Fizika-matematika" },
      { time: "17:20-18:40", subject: "Ehtimollar nazariyasi", type: "Amaliy", instructor: "YODGAROV S. J.", group: "2-12 Fizika-matematika" }
  ],
  "Shanba": [
      { time: "14:00-15:40", subject: "Funksiyalar nazariyasi", type: "Ma'ruza", instructor: "TURGUNBAYEV R. M.", group: "2-12 Fizika-matematika" },
      { time: "16:00-17:20", subject: "Algebra va sonlar nazariyasi", type: "Ma'ruza", instructor: "MUXAMEDOVA G. R.", group: "2-12 Fizika-matematika" },
      { time: "17:20-18:40", subject: "Geometriya", type: "Amaliy", instructor: "MANASIPOVA R. Z.", group: "2-12 Fizika-matematika" }
  ]
};

function createSchedule() {
  const container = document.getElementById('schedule');

  for(const [day, lessons] of Object.entries(fullSchedule)) {
      const column = document.createElement('div');
      column.className = 'day-column';

      let content = `<div class="day-header">${day}</div>`;
      lessons.forEach(lesson => {
          content += `
              <div class="time-slot">
                  <div class="lesson-title">${lesson.subject}</div>
                  <div class="lesson-details">
                      <p>🕒 ${lesson.time}</p>
                      <p>🎓 ${lesson.instructor}</p>
                      <p>📚 ${lesson.type}</p>
                      <p>👥 ${lesson.group}</p>
                  </div>
              </div>
          `;
      });

      column.innerHTML = content;
      container.appendChild(column);
  }
}

createSchedule();