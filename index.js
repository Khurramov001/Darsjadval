const express = require('express');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Bot tokenini kiriting
const token = '7291198987:AAFJiJ1nxyO0MXjw4dMUjGGeIjul_EX1exk';
const bot = new TelegramBot(token, { polling: true });

// Foydalanuvchilar ro'yxati (keyinchalik ma'lumotlar bazasiga ulashingiz mumkin)
const users = [];

// Foydalanuvchilarni qo'shish
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    if (!users.includes(chatId)) {
        users.push(chatId);
        bot.sendMessage(chatId, "Siz eslatmalar ro'yxatiga qo'shildingiz!");
    } else {
        bot.sendMessage(chatId, "Siz allaqachon ro'yxatdasiz!");
    }
});

// Dars boshlanishidan 10 daqiqa oldin eslatma yuborish
cron.schedule('*/10 * * * *', () => {
    const message = "Dars boshlanishiga 10 daqiqa qoldi! Tayyor bo'ling!";
    users.forEach(chatId => {
        bot.sendMessage(chatId, message);
    });
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portida ishga tushdi...`);
});