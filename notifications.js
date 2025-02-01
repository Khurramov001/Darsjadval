const BOT_TOKEN = '7291198987:AAFJiJ1nxyO0MXjw4dMUjGGeIjul_EX1exk';
let USER_CHAT_ID = null;

function sendRatingReminder(lesson) {
    const reminderText = `⏰ Diqqat! 5 daqiqadan keyin dars tugaydi:\n📚 ${lesson.subject}\n🕒 ${lesson.time}\n🎓 ${lesson.instructor}\nIltimos, darsni baholang!`;

    try {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: USER_CHAT_ID,
                text: reminderText
            })
        });
    } catch (error) {
        console.error('Xatolik:', error);
    }
}
async function sendReminder(lesson) {
   const reminderText = `⏰ Diqqat! 5 daqiqadan keyin dars:\n📚 ${lesson.subject}\n🕒 ${lesson.time}\n🎓 ${lesson.instructor}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: USER_CHAT_ID,
                text: reminderText
            })
        });
    } catch (error) {
        console.error('Xatolik:', error);
    }
}

function calculateReminderTime(dayName, timeString) {
    const daysMap = {
        "Dushanba": 1,
        "Chorshanba": 2,
        "Payshanba": 3,
        "Shanba": 6
    };

    const [start] = timeString.split('-');
    const [hours, minutes] = start.split(':');

    const date = new Date();
    const targetDay = daysMap[dayName];
    const currentDay = date.getDay();

    const diff = (targetDay + 7 - currentDay) % 7;
    date.setDate(date.getDate() + diff);

    date.setHours(hours, minutes - 5, 0, 0);
    return date.getTime();
}

function setupReminders() {
    Object.entries(fullSchedule).forEach(([day, lessons]) => {
        lessons.forEach(lesson => {
            const reminderTime = calculateReminderTime(day, lesson.time);
            if(reminderTime > Date.now()) {
                setTimeout(() => sendReminder(lesson), reminderTime - Date.now());
            }
        });
    });
}

document.getElementById('notificationBtn').addEventListener('click', () => {
    USER_CHAT_ID = Telegram.WebApp.initDataUnsafe.user?.id;
    if(USER_CHAT_ID) {
        setupReminders();
        Telegram.WebApp.showAlert('🔔 Barcha eslatmalar faollashtirildi!');
    } else {
        Telegram.WebApp.showAlert('⚠️ Botga kirishni tekshiring!');
    }
});
