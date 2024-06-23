const { Client, GatewayIntentBits } = require('discord.js');

const keepAlive = require('./server'); // Importer le fichier server.js

const client = new Client(intents:8);

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



keepAlive(); // Garder le serveur actif
client.login(process.env.DISCORD_TOKEN);
