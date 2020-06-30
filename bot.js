const { Client, MessageEmbed  } = require("discord.js");
const { config } = require("dotenv");

const aq= "hi";

const client = new Client({
    disableEveryone: true
})

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    (async () => {
        // get the results
      
        // use the resuls as you wish
      })();
     

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})

client.on("message", async message => {
    const prefix = "_";

    // If the author's a bot, return
    // If the message was not sent in a server, return
    // If the message doesn't start with the prefix, return
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // Arguments and command variable
    // cmd is the first word in the message, aka the command
    // args is an array of words after the command
    // !say hello I am a bot
    // cmd == say (because the prefix is sliced off)
    // args == ["hello", "I", "am", "a", "bot"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd === "hey") {

        message.channel.send("hey");
    }
    

	if (command === 'today') {
	const { file } = await fetch('https://localhost:8000/api/coast/nosecure').then(response => response.json());

	message.channel.send(file);
}
  
        
    }
});

client.login(process.env.TOKEN);