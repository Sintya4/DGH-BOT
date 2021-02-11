const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setmessage",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    
    
    //Now we gonna use quick.db
    
    db.set(`message_${message.guild.id}`)
    
    message.channel.send(`Welcome Channel is seted as ${args.join(" ")}`)
  }
}