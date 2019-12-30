// Biblioteki
const Discord = require("discord.js");
const db = require('quick.db');
//bot
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`// ** Castle Guard został włączony ** // \nNazwa #0000: ${bot.user.tag}\nPrefix: ${defaultSettings.botPrefix}`);
    client.user.setStatus(`dnd`);
    client.user.setActivity(`Commands will be available soon`, {type: "PLAYING"});
});
//id kanalu
//const advertisementsChannel = "479171845317197824";

client.on('message', message => {
    let prefix = "kek!";
    //let prefix = konfiguracja.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let msg = message.content.startsWith;
    let args = messageArray.slice(1);

    if(cmd === `${prefix}test`){
        message.channel.send(`**Castle Guard:** Wywolano testowa komende.`)
    }
});

client.login(process.env.TOKEN);
