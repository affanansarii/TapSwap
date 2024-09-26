const { Telegraf } = require('telegraf');
const axios = require('axios');
const TOKEN = '7828196036:AAFkXl7N6JkHX8nk6gyVWO_pWhtwvVlnilI';

const bot = new Telegraf(TOKEN);

function startBot() {
    bot.start((ctx) => {
        ctx.reply('Welcome to TapMe! Click the button to start earning coins.');
    });

    // Handle tapping functionality
    bot.command('tap', async (ctx) => {
        const telegramId = ctx.message.from.id;

        // Call the API to increment coin count
        const response = await axios.post('http://localhost:5000/api/game/tap', { telegramId });
        ctx.reply(`You now have ${response.data.coins} coins!`);
    });

    bot.launch();
}

module.exports = { startBot };
