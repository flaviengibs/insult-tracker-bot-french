const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});
let bannedWords = ["putain", "merde", "chiant", "con", "salope", "salopard", "pute", "fdp", "salaud", "ta mère la", "porn","chiasse", "bite", "zizi", "encullé", "enculleur", "couilles"];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    const content = message.toLowerCase;
    if (bannedWords.some(word => content.includes(word))) {
        try {
            message.delete();
            message.channel.send(`Message supprimé car il contenait un mot interdit.`);
        } catch (error) {
            console.error('Erreur lors de la suppression du message:', error);
        }
        }
}); 

client.login("MTI1NDUwMDYxNTgzNzU4MTQxNQ.G4MtI6.iCltycI67Evwv0Mp283bphLIde7pCYT8hCSUS8");
