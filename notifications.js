const BOT_TOKEN = '7291198987:AAFJiJ1nxyO0MXjw4dMUjGGeIjul_EX1exk';
let USER_CHAT_ID = null;

// Tugma holatini localStorage dan olish
let remindersEnabled = localStorage.getItem('remindersEnabled') === 'true';

// Tugma holatini yangilash
function updateButtonState() {
    const notificationBtn = document.getElementById('notificationBtn');
    if (remindersEnabled) {
        notificationBtn.classList.add('active');
        notificationBtn.classList.remove('inactive');
        notificationBtn.textContent = '🔔 Eslatmalar Yoqilgan';
    } else {
        notificationBtn.classList.add('inactive');
        notificationBtn.classList.remove('active');
        notificationBtn.textContent = '🔔 Eslatmalarni Yoqish';
    }
}

// Eslatmalarni yoqish/o'chirish
function toggleReminders() {
    remindersEnabled = !remindersEnabled;
    localStorage.setItem('remindersEnabled', remindersEnabled);

    if (remindersEnabled) {
        setupReminders();
        Telegram.WebApp.showAlert('🔔 Barcha eslatmalar faollashtirildi!');
    } else {
        Telegram.WebApp.showAlert('🔕 Barcha eslatmalar o\'chirildi!');
    }

    updateButtonState();
}

// Sahifa yuklanganda tugma holatini yangilash
document.addEventListener('DOMContentLoaded', () => {
    updateButtonState();
});

// Tugma bosilganda eslatmalarni yoqish/o'chirish
document.getElementById('notificationBtn').addEventListener('click', () => {
    USER_CHAT_ID = Telegram.WebApp.initDataUnsafe.user?.id;
    if (USER_CHAT_ID) {
        toggleReminders();
    } else {
        Telegram.WebApp.showAlert('⚠️ Botga kirishni tekshiring!');
    }
});

// Eslatmalarni sozlash (oldingi kod)
function setupReminders() {
    Object.entries(fullSchedule).forEach(([day, lessons]) => {
        lessons.forEach(lesson => {
            const reminderTime = calculateReminderTime(day, lesson.time);
            if (reminderTime && reminderTime > Date.now()) {
                setTimeout(() => {
                    const reminderText = `⏰ Diqqat! 5 daqiqadan keyin dars:\n📚 ${lesson.subject}\n🕒 ${lesson.time}\n🎓 ${lesson.instructor}`;
                    sendMessage(USER_CHAT_ID, reminderText);
                }, reminderTime - Date.now());
            }
        });
    });
}
