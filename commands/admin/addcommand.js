const db = require("quick.db")

module.exports = {
  name: "addcmd",
  usage: "addcmd <badword>",
  args: true,
  permissions: "MANAGE_GUILD",
  description: "add guild custom Badword",
  category: "admin",
  permissions: "MANAGE_GUILD",
  run: (client, message, args) => {
  	message.delete()
    let cmdname = args[0]
    let database = db.get(`cmd_${message.guild.id}`)
    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(":x: This badword name is already added in guild custom badword.")
    let data = {
      name: cmdname.toLowerCase()
    }
    db.push(`cmd_${message.guild.id}`, data)
    return message.channel.send("Added **" + cmdname.toLowerCase() + "** as a custom badword in guild.")
}
}