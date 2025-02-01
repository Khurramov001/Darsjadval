const lessonRatings = {};

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

    lessonRatings[subject][userId] = rating;
    console.log(`"${subject}" darsi ${rating} ball bilan baholandi.`);
}

function calculateAverageRating(subject) {
    if (!lessonRatings[subject] || Object.keys(lessonRatings[subject]).length === 0) {
        return 0;
    }

    const ratings = Object.values(lessonRatings[subject]);
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;

    return average.toFixed(2);
}

const stars = document.querySelectorAll('.stars span');
const averageRatingElement = document.getElementById('averageRating');

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        const subject = "Geometriya";
        const userId = Telegram.WebApp.initDataUnsafe.user?.id;

        if (!userId) {
            alert("Iltimos, avval botga kirish amalga oshiring!");
            return;
        }

        rateLesson(subject, userId, rating);

        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        const averageRating = calculateAverageRating(subject);
        averageRatingElement.textContent = averageRating;
    });
});