// Biblioteki
const Discord = require("discord.js");
const db = require('quick.db');
//bot
const client = new Discord.Client();

//id kanalu
//const advertisementsChannel = "479171845317197824";

client.on('message', message => {
    let prefix = "adv!";
    //let prefix = konfiguracja.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let msg = message.content.startsWith;
    let args = messageArray.slice(1);

    if(cmd === `${prefix}timereset`){
        if (!message.member.roles.find(r => r.id === "455430899861815296")) return message.channel.send("Nie masz uprawnień do tego. Wymagany poziom uprawnień to `St. Administrator`.");
        let aUser = message.mentions.users.first() || message.author;
        db.set(aUser.id, Date.now() + 0)
        message.channel.send(`Czas złożenia kolejnej reklamy został zresetowany dla ${aUser.tag}`)
    }

    if(cmd === `${prefix}eval`){
        //if(konfiguracja.commands === "disabled") return message.channel.send(`${bot.emojis.find(`name`, 'error')} All commands in the bot have been disabled!`);
        if(message.author.id !== '396284197389729793') return message.channel.send("Nie masz uprawnień do tej komendy, wymagana ranga: `Założyciel(ka)`.")
        if(!args[0]) return message.channel.send("Podaj kod, który mam evalować.")
        let result = eval(args.join(" ")).toString()
          let embed = new Discord.RichEmbed()
          //.setTitle("Eval")
          .addField(`WEJŚCIE`, "```"+args.join(" ")+"```")
          .addField(`WYJŚCIE`, "```"+result+"```")
          .setColor("RANDOM")
          .setFooter(`Kod evalował(a) ${message.author.tag}`, `https://cdn.discordapp.com/emojis/472480341299298304.png?v=1`)
          message.channel.send(embed);
    }

    if (message.channel.id === "492401462756769793") { 
        if (Date.now() < db.fetch(message.author.id)) {    
            message.delete();
            return message.author.send("**Wysłałeś(aś) już jedną reklamę.** \nOznacza to, że kolejną możesz wysłać, gdy minie 24h. ```~~Cookie Community```")  
        }

        db.set(message.author.id, Date.now() + 86400000)
        //message.author.send("**Twoja reklama została wysłana!**")
        const embed = new Discord.RichEmbed()
        .setDescription(`Użytkownik ${message.author} (${message.author.id}) próbował(a) się zareklamować, ale nie minęło 24h.`)
        client.channels.get("460676417064140801").send(embed);
    }
});

client.on('ready', () => { 
    console.log("Bot został włączony.");
});

//client.on('disconnect', () => { 
    //console.log("Bot bedzie off");

//});

client.login(process.env.TOKEN);
