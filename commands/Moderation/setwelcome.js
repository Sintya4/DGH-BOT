const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    
    let channel = message.mentions.channels.first()
    const msh =args.slice(1).join(" ")// JSON.parse(args.slice(1).join(" "));
       
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    db.set(`messag_${message.guild.id}`, msh)
    
    message.channel.send(`Welcome Channel is seted as ${channel}`)
  }
}