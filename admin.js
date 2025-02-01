document.addEventListener('DOMContentLoaded', () => {
    const userCountElement = document.getElementById('userCount');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const scheduleInput = document.getElementById('scheduleInput');
    const updateScheduleBtn = document.getElementById('updateScheduleBtn');

    // Foydalanuvchilar sonini yuklash
    fetch('/users/count')
        .then(response => response.json())
        .then(data => {
            userCountElement.textContent = data.count;
        });

    // Xabar yuborish
    sendMessageBtn.addEventListener('click', () => {
        const message = messageInput.value;
        if (message) {
            fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.status);
            });
        } else {
            alert("Xabar matnini kiriting!");
        }
    });

    // Dars jadvalini yangilash
    updateScheduleBtn.addEventListener('click', () => {
        const schedule = scheduleInput.value;
        if (schedule) {
            fetch('/update-schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ schedule })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.status);
            });
        } else {
            alert("Dars jadvalini kiriting!");
        }
    });
});