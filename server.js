require('dotenv').config();
const { Client } = require('discord.js');
const bot = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const youtube = require('./src/youtube/youtube');

const getLatest = (channel) => {
  //TODO: Anropa youtube funktionen som hämtar senaste vid å checka osv
  youtube(channel);
};

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  const channel = await bot.channels.fetch('952273632581804063');
  // channel.send('Im online xDD');
  getLatest(channel);
  // Calls youtube evry 30 min. change last number to change it.
  // setInterval(getLatest, 1000 * 60 * 30);
});

bot.on('messageCreate', (msg) => {
  const message = msg.content;
  const notBot = !msg.author.bot;
  console.log('userId:', msg.member.user.id);
  if (notBot && msg.channel.id === '952273632581804063') {
    if (message === 'ping') {
      msg.channel.send('Pong!');
    } else if (msg.member.user.id !== '168345203806175232')
      msg.channel.send('madafakk');
  }
});

bot.on('messageDelete', (msg) => {
  message = msg.content;
  console.log(msg.user);
});

bot.login(process.env.CLIENT_TOKEN);
