const db = require("quick.db")

module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "moderation",
  run: (client, message, args) => {
message.delete()
/*const {Discord } = require("discord.js");
 
     const emg = new Discord.messageEmbed()
     .setTitle("⚠️Warning⚠️")
     . setDescription ("```\nyou do not have permission to use this command,This is only owner.\n```")
     .setTimestamp()*/
   if (message.author.id != `${message.guild.ownerID}` )
     
     return message.channel.send("<a:failed:798526823976796161> =```\n you do not have permission to use this command,This is only owner.\n```").then(m=>m.delete({timeout:550000}).catch(e=>{}))


    let cmdname = args[0]

    if(!cmdname) return message.channel.send("<a:failed:798526823976796161> Gimm me commmand name, `delcmd <cmd_name>`")

    let database = db.get(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send("<a:failed:798526823976796161> Unable to find this command.")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`<a:success:798526789114134548> Deleted the **${cmdname}** Command!`)


    } else {
      return message.channel.send("<a:failed:798526823976796161> Sorry but i am unable to find that command!")
    


  }
  }
}
 