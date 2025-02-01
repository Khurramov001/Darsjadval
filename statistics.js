document.addEventListener('DOMContentLoaded', () => {
    const statisticsElement = document.getElementById('statistics');

    for (const subject in lessonRatings) {
        const averageRating = calculateAverageRating(subject);
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <p><strong>${subject}</strong>: ${averageRating} ball</p>
        `;
        statisticsElement.appendChild(statItem);
    }
});