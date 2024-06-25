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
    "couillon", "crétin", "débile", "enfoiré", "enculé", "espèce de", "imbécile", "idiot", "imbécile heureux",
    "imbécile profond", "incapable", "inutile", "merde", "merdeux", "nase", "naze", "nul", "pédé", "putain", 
    "pute", "salope", "taré", "teubé", "trou du cul", "tarlouze", "truffe", "abruti fini", "andouille de première", 
    "bouffon de service", "casse-couilles", "crétin de base", "débile profond", "enculé de tes morts", 
    "espèce de saloperie", "fils de pute", "gros con", "handicapé du cerveau", "incapable notoire", 
    "inutilité publique", "merde ambulante", "merde infâme", "nase complet", "naze absolu", "nul à chier", 
    "pédale", "putain de merde", "pute à fric", "sale con", "salope finie", "taré complet", "teubé notoire", 
    "trou du cul fini", "tarlouze en puissance", "truffe de compétition", "salaud", "salopard", "porn", 
    "porno", "pornographie", "pédophile", "viol", "violer", "violeur", "inceste", "sodomie", "baiser", 
    "branler", "branlette", "cul", "puter", "sucer", "suceur", "ta gueule", "nique ta mère", "nique", 
    "niquer", "enculer", "trouduc", "pute à fric", "batard", "pd", "conn**d", "c*n", "enfoir*", "enc*l*", 
    "fdp", "fils de p*", "mer**", "sa*ope", "tr** du cul", "n*que", "su**r", "s*x", "s*xe", "p*rn", "p*do", "tepu", "ptn", "mrd", "slpe", "salope va", "chit", "ta mère la", "ta mere la" ];



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Fonction pour supprimer les accents
function removeAccents(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Ajout des versions sans accents des mots
const bannedWordsSansAccents = bannedWords.map(removeAccents);

// Fusion des listes d'insultes originales et sans accents
const allInsultes = [...bannedWords, ...bannedWordsSansAccents];

const escapedBannedWords = bannedWords.map(escapeRegExp);

function containsExactWord(message, wordList) {
  return wordList.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i'); // 'i' pour insensible à la casse
    return regex.test(message.content);
  });
}


client.on('messageCreate', message => {
    console.log("Message received : " + message);
    if(containsExactWord(message.content, escapedBannedWords)) {
      console.log("Mot banni détecté");
      message.delete();
      console.log("Message supprimé");
      message.channel.send(`${message.author}, veuillez ne pas utiliser de termes offensants ou inappropriés. Votre message a été supprimé`);
    } else {
      console.log("Pas de mot banni");
    }
}); 

client.login("MTI1NDUwMDYxNTgzNzU4MTQxNQ.G4MtI6.iCltycI67Evwv0Mp283bphLIde7pCYT8hCSUS8");
