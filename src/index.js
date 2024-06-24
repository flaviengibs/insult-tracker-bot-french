const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});
let bannedWords = ["putain", "merde", "chiant", "con", "salope", "salopard", "pute", "fdp", "salaud", "ta mère la", "porn","chiasse", "bite", "zizi", "encullé", "enculleur", "couille"];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


function containsExactWord(message) {
  return bannedWords.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i'); // 'i' pour insensible à la casse
    return regex.test(message.content);
  });
}


client.on('messageCreate', message => {
    console.log("Message received : " + message);
    if(containsExactWord(message)) {
      console.log("Mot banni détecté");
      message.delete();
      console.log("Message supprimé");
      message.channel.send(`${message.author}, votre message a été supprimé car il contenait un mot interdit.`);
    } else {
      console.log("Pas de mot banni");
    }
}); 

client.login("MTI1NDUwMDYxNTgzNzU4MTQxNQ.G4MtI6.iCltycI67Evwv0Mp283bphLIde7pCYT8hCSUS8");
