const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "welcomer",
  category: "moderation",
  args: true,
  usage: "welcomer channel <ChannelMention>\nwelcomer message <...Message/JSON>`^(Must include ({member},{username},{tag},{server},{size}) for this to work!)^`\nwelcomer testmessage",
  description: "Set the welcome",
  run: (client, message, args) => {
    const channel = message.mentions.channels.first()
    const [key, ...value] = args;
    switch (key) {
    case "channel":
        {
    if(!channel) {
    return message.channel.send(`${client.emotes.error}Pls Give Invalid channel... Try again...`)
    };
    db.set(`welchannel_${message.guild.id}`, channel.id)
    const welcome = new Discord.MessageEmbed()
    .setDescription (`**Done** From now on I will send welcome message in ${channel} when someone joins the server`)
    message.channel.send(welcome)
   };
    break;
    case "message":
        {
    const msg = args.slice(1).join(" ")
    if(!msg) {
    return message.channel.send(`${client.emotes.error}\`Please give a message to welcomer ^(Must include ({member},{username},{tag},{server},{size}) for this to work!)^\``).then(m=>m.delete({timeout:8000}).catch(e=>{}))
    };
    db.set(`message_${message.guild.id}`, msg)
    const messag = new Discord.MessageEmbed()
    .setDescription (`**Done** From now on I will send\n\`${msg}\``)
    message.channel.send(messag)
  };
    break;
    case "testmessage":
        {
    const test = new Discord.MessageEmbed()
    .setTitle (`**Testing Member Join**`)
    message.channel.send(test)
    let chx = db.get(`welchannel_${message.guild.id}`)
    let ms =  db.get(`message_${message.guild.id}`)  .replace(`{member}`,message.author)// Member mention substitution
    .replace(`{user}`,message.author)// Member mention substitution
    .replace(`{username}`, message.author.username) // Username substitution
    .replace(`{tag}`, message.author.tag) // Tag substitution
    .replace(`{server}`, message.guild.name) // Name Server substitution
    .replace(`{size}`, message.guild.members.cache.size);
  
   if (ms === null) {
       let ms =  db.set(`message_${message.guild.id}`,`Welcomer To server ${message.author}`)
  }
    const sender = client.channels.cache.get(chx);
    sender.send(ms)
  
   }};
}};
  
    /* 
  Now we gonna use quick.db*/
    