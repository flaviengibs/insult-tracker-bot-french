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

function containsBannedWord(message) {
  const content = message.content ? message.content : message;
  const lowerCaseMessage = content.toLowerCase();
  return bannedWords.some(word => lowerCaseMessage.includes(word.toLowerCase()));
}

client.on('messageCreate', message => {
    console.log("Message received : " + message);
    if(containsBannedWord(message)) {
      console.log("Mot banni détecté");
      message.delete;
      console.log("Message supprimé");
      message.channel.send("Un mot banni a été détecté. Le message a été supprimé.");
    } else {
      console.log("Pas de mot banni");
    }
}); 

client.login("MTI1NDUwMDYxNTgzNzU4MTQxNQ.G4MtI6.iCltycI67Evwv0Mp283bphLIde7pCYT8hCSUS8");
