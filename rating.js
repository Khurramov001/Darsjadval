const lessonRatings = {};

// Baholarni 10 soatgacha saqlash
function cleanupOldRatings() {
    const currentTime = Date.now();
    for (const subject in lessonRatings) {
        for (const userId in lessonRatings[subject]) {
            const ratingTime = lessonRatings[subject][userId].timestamp;
            if (currentTime - ratingTime > 10 * 60 * 60 * 1000) { // 10 soat = 10 * 60 * 60 * 1000 millisekund
                delete lessonRatings[subject][userId];
            }
        }
    }
}

// Foydalanuvchi qaysi darsga baho berayotganini aniqlash
function getCurrentLesson() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('uz-UZ', { weekday: 'long' }); // Joriy kunni olish
    const currentTime = now.toTimeString().slice(0, 5); // Joriy vaqtni "HH:MM" formatida olish

    const lessons = fullSchedule[currentDay];
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
        console.log("Siz allaqachon baholagansiz!");
        return;
    }

    if (rating < 1 || rating > 5) {
        console.log("Baholash 1 dan 5 gacha bo'lishi kerak.");
        return;
    }

    lessonRatings[subject][userId] = { rating, timestamp: Date.now() };
    console.log(`"${subject}" darsi ${rating} ball bilan baholandi.`);
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
const stars = document.querySelectorAll('.stars span');
const averageRatingElement = document.getElementById('averageRating');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        const currentLesson = getCurrentLesson(); // Joriy darsni aniqlash
        const userId = Telegram.WebApp.initDataUnsafe.user?.id;

        if (!userId) {
            alert("Iltimos, avval botga kirish amalga oshiring!");
            return;
        }

        if (!currentLesson) {
            alert("Hozir hech qanday dars bo'lmaganligi sababli baho berish mumkin emas!");
            return;
        }

        rateLesson(currentLesson.subject, userId, rating);

        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        const averageRating = calculateAverageRating(currentLesson.subject);
        averageRatingElement.textContent = averageRating;
    });
});
