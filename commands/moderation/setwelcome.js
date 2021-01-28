const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {

   if (message.author.id != `${message.guild.ownerID}` )

     

     return message.channel.send("```\nyou do not have permission to use this command,This is only owner.\n```").then(m=>m.delete({timeout:550000}).catch(e=>{}))
    
    
    
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
       return message.channel.send(`How To Setup Welcomer\nsetwelcomer #Channel-name\`\`\`\nPlease Mention the channel first\n\`\`\``).then(m=>m.delete({timeout:10000}).catch(e=>{}))
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
      
    message.channel.send(`Success Welcomer Set\`\`\`\nWelcome Channel is seted as ${channel}\n\`\`\``).then(m=>m.delete({timeout:10000}).catch(e=>{}))
     
  }}