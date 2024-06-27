const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});
let bannedWords = ["abruti", "andouille", "anormal", "arriéré", "bâtard", "bouffon", "connard", "conne", "connasse", "con",
    "couillon", "crétin", "débile", "enfoiré", "encullé", "enculé", "espèce de", "imbécile", "idiot", "imbécile heureux",
    "imbécile profond", "merde", "merdeux", "nase", "naze", "nul", "pédé", "putain", 
    "pute", "salope", "taré", "teubé", "trou du cul", "tarlouze", "truffe", "abruti fini", "andouille de première", 
    "bouffon de service", "casse-couilles", "crétin de base", "débile profond", "enculé", "encullé", "enculler",
    "espèce de saloperie", "fils de pute", "gros con", "handicapé du cerveau", "incapable notoire", 
    "inutilité publique", "merde ambulante", "merde infâme", "nase complet", "naze absolu", "nul à chier", 
    "putain de merde", "pute à fric", "sale con", "salope finie", "taré complet", "teubé notoire", 
    "trou du cul fini", "tarlouze en puissance", "truffe de compétition", "salaud", "salopard", "porn", 
    "porno", "pornographie", "pédophile", "viol", "violer", "violeur", "inceste", "sodomie", "baiser", 
    "branler", "branlette", "cul", "puter", "sucer", "suceur", "ta gueule", "nique ta mère", "nique", 
    "niquer", "enculer", "trouduc", "pute à fric", "batard", "pd", "conn**d", "c*n", "enfoir*", "enc*l*", 
    "fdp", "fils de p*", "mer**", "sa*ope", "tr** du cul", "n*que", "su**r", "s*x", "s*xe", "p*rn", "p*do", "tepu",
    "ptn", "mrd", "slpe", "salope va", "chit", "ta mère la", "ta mere la", "abruti", "andouille",
    "arriere", "batard", "bouffon", "connard", "conne", "connasse", "con",
    "couillon", "cretin", "debile", "enfoire", "encule", "espece de", "imbecile", "idiot", "imbecile heureux",
    "imbecile profond", "merde", "merdeux", "nase", "naze", "nul", "pede", "putain",
    "pute", "salope", "tare", "teube", "trou du cul", "tarlouze", "truffe", "abruti fini", "andouille de premiere",
    "bouffon de service", "casse-couilles", "cretin de base", "debile profond",
    "espece de saloperie", "fils de pute", "gros con", "handicape du cerveau", "incapable notoire",
    "inutilite publique", "merde ambulante", "merde infame", "nase complet", "naze absolu", "nul a chier",
    "putain de merde", "pute a fric", "sale con", "salope finie", "tare complet", "teube notoire",
    "trou du cul fini", "tarlouze en puissance", "truffe de competition", "salaud", "salopard", "porn",
    "porno", "pornographie", "pedophile", "viol", "violer", "violeur", "inceste", "sodomie", "baiser",
    "branler", "branlette", "cul", "puter", "sucer", "suceur", "ta gueule", "nique ta mere", "nique",
    "niquer", "enculer", "trouduc", "pute a fric", "batard", "pd", "conn**d", "c*n", "enfoir*", "enc*l*",
    "fdp", "fils de p*", "mer**", "sa*ope", "tr** du cul", "n*que", "su**r", "s*x", "s*xe", "p*rn", "p*do", 
    "tepu", "ptn", "mrd", "slpe", "salope va", "chit", "ta mere la", "ta mere la", "49.3", "macron démission" ];



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const escapedBannedWords = bannedWords.map(escapeRegExp);

function containsExactWord(messageContent, wordList) {
  return wordList.some(word => {
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');// 'i' pour insensible à la casse
    return regex.test(messageContent);
  });
}


client.on('messageCreate', message => {
    console.log("Message received : " + message.content);
    if(containsExactWord(message.cleanContent, escapedBannedWords)) {
      console.log("Mot banni détecté");
      message.delete();
      console.log("Message supprimé");
      message.channel.send(`${message.author}, veuillez ne pas utiliser de termes offensants ou inappropriés. Votre message a été supprimé.`);
    } else if (message.content.includes("enculé") || message.content.includes('encullé')){
      console.log("Le message contient enculé.");
      message.delete();
      console.log("Message supprimé")
      message.channel.send(`${message.author}, veuillez ne pas utiliser de termes offensants ou inappropriés. Votre message a été supprimé.`)
    } else {
      console.log("Pas de mot banni");
    }
}); 

client.login(process.env.DISCORD_TOKEN);
