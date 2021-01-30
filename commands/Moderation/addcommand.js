const db = require("quick.db")

module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "add guild custom commands",
  category: "moderation",
  args: true,
  owner: true,
  run: (client, message, args) => {
  	message.delete()
const {Discord } = require("discord.js");
 
     const emg = new Discord.messageEmbed()
     .setTitle("⚠️Warning⚠️")
     . setDescription ("```\nyou do not have permission to use this command,This is only owner.\n```")
     .setTimestamp()
   if (message.author.id != `${message.guild.ownerID}` )
     
     return message.channel.send(emg).then(m=>m.delete({timeout:50000}).catch(e=>{}))



    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: You need `MANAGE_MESSAGES` perms to use this command")

    let cmdname = args[0]

    if(!cmdname) return message.channel.send(`:x: You have to give command name, \`addcmd <cmd_name> <cmd_responce>\``)

    let cmdresponce = args.slice(1).join(" ")

    if(!cmdresponce) return message.channel.send(`:x: You have to give command cmd responce, \`addcmd <cmd_name> <cmd_responce>\``)

    let database = db.get(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(":x: This command name is already added in guild custom commands.")

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("Added **" + cmdname.toLowerCase() + "** as a custom command in guild.")


  }
}