const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "welcomer",
  category: "moderation",
  usage: "welcomer channel <ChannelMention>\nwelcomer message <...Message>`^({member},{username},{tag},{server},{size})^`welcomer [enable|disable]",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    const channel = message.mentions.channels.first()
    const [key, ...value] = args;
    switch (key) {
    case "channel":
        {
    if(!channel) {
      return message.channel.send(`${client.emojis.error} Invalid channel... Try again...`)
     db.set(`welchannel_${message.guild.id}`, channel.id)
       const welcome = new Discord.MessageEmbed()
    .setDescription (`**Done** From now on I will send welcome`)
  message.channel.send(`Welcome channel has been set to ${channel}.`)
   };
        };
    break;
        case "message":
        {
    const msg = args.slice(1).join(" ")
    db.set(`message_${message.guild.id}`, msg)
    const setup = new Discord.MessageEmbed()
    .setDescription (`**Done** From now on I will send\n\`${msg}\``)
    message.channel.send(setup)
   }}
}}
  
    /*  let chx = db.set(`welchannel_${message.guild.id}`, channel.id)
   const sender = client.channels.cache.get(chx);
    sender.send(`Welcome to server ${message.author}`)
  
  Now we gonna use quick.db*/
    