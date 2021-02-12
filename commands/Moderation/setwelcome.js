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
          //ARGUMENT
    
       
    if(!channel) {
      return message.channel.send(${client.emojis.error})
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    db.set(`message_${message.guild.id}`, msh)
    
    message.channel.send(`Welcome Channel is seted as ${channel}`)
  }
}