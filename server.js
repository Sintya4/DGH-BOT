const Discord = require('discord.js'); 
const client = new Discord.Client(); 
client.once('ready', () => {
  console.log('Ready!'); 
  client.user.setActivity(`Test bot`);
});

client.on("message", message => { 
  if(message.content === "!ping") { 
    return message.channel.send(`Pong ${client.ws.ping}`); //it will return message
  }
});

client.login('NzgxNDYxNDY4NTI0MzE0NjI1.X79-tA.qgMtxd4BGEsLJTP1fX4n8ImQ1Lo'); //Paste Your Bot Token

