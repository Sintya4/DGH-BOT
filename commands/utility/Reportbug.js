const discord = require ("discord.js")
module.exports = {
  name: "bug",
category: "utility",
  args: true,
  description: "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
  usage: "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
run : async(client, message, args) => { 
// again make this fit your command handler style 😀
  args = args.join(" ");   
  message.reply("Thanks for submitting a bug!, we will check your report");  
  const content = new discord.MessageEmbed()
  .setTitle("New Report Bug")
  .addField("User Name",`**${message.author.username}#${message.author.discriminator}**`)
  .addField("ID User",message.author.id)
  .addField("Reported", args)
  .addField("Server Name",`**${message.guild.name}**`)
  .addField("ID Server",`**${message.guild.id}**`)  
  client.channels.cache.get('820541550572339230').send(content)
}
}