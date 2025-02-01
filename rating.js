const lessonRatings = {};

// Baholarni 10 soatgacha saqlash
function cleanupOldRatings() {
    const currentTime = Date.now();
    for (const subject in lessonRatings) {
        for (const userId in lessonRatings[subject]) {
            const ratingTime = lessonRatings[subject][userId].timestamp;
            if (currentTime - ratingTime > 10 * 60 * 60 * 1000) { // 10 soat
                delete lessonRatings[subject][userId];
            }
        }
    }
}

// Joriy darsni aniqlash
function getCurrentLesson() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('uz-UZ', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);

    const lessons = window.fullSchedule[currentDay];
    if (!lessons) return null;

    for (const lesson of lessons) {
        const [startTime, endTime] = lesson.time.split('-');
        if (currentTime >= startTime && currentTime <= endTime) {
            return lesson;
        }
    }
    return null;
}

// Darsni baholash
function rateLesson(subject, userId, rating) {
    if (!lessonRatings[subject]) {
        lessonRatings[subject] = {};
    }

    if (lessonRatings[subject][userId]) {
        alert("Siz allaqachon baholagansiz!");
        return;
    }

    if (rating < 1 || rating > 5) {
        alert("Baholash 1 dan 5 gacha bo'lishi kerak.");
        return;
    }

    lessonRatings[subject][userId] = { rating, timestamp: Date.now() };
    alert(`"${subject}" darsi ${rating} ball bilan baholandi.`);
}

// O'rtacha bahoni hisoblash
function calculateAverageRating(subject) {
    if (!lessonRatings[subject] || Object.keys(lessonRatings[subject]).length === 0) {
        return 0;
    }

    cleanupOldRatings(); // Eski baholarni tozalash

    const ratings = Object.values(lessonRatings[subject]).map(r => r.rating);
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;

    return average.toFixed(2);
}

// Yulduzchalar interfeysi
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.stars span');
    const averageRatingElement = document.getElementById('ratingValue');
    const lessonTitleElement = document.getElementById('title');
    const lessonTimeElement = document.getElementById('time');

    const currentLesson = getCurrentLesson();
    if (!currentLesson) {
        alert("Hozir hech qanday dars bo'lmaganligi sababli baho berish mumkin emas!");
        window.location.href = "index.html"; // Bosh sahifaga qaytish
        return;
    }

    lessonTitleElement.textContent = currentLesson.subject;
    lessonTimeElement.textContent = currentLesson.time;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            const userId = Telegram.WebApp.initDataUnsafe.user?.id;

            if (!userId) {
                alert("Iltimos, avval botga kirish amalga oshiring!");
                return;
            }

            rateLesson(currentLesson.subject, userId, rating);

            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.classList.remove('inactive');
                } else {
                    s.classList.add('inactive');
                    s.classList.remove('active');
                }
            });

            const averageRating = calculateAverageRating(currentLesson.subject);
            averageRatingElement.textContent = averageRating;
        });
    });
});
