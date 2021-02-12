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
     message.channel.send(`Welcome channel has been set to ${channel}. Testing it...`)
     
  };
        };
    //Now we gonna use quick.db
    
    db.set(`message_${message.guild.id}`, msh)
    
  }
}}