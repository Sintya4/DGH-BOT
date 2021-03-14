module.exports = {
  name: "bug",
category: "utility",
  args: true,
  description: "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
  usage: "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
run : async(client, message, args) => { 
// again make this fit your command handler style 😀
  args = args.join(" ");   
  message.reply("Thanks for submitting a bug!");  
  const content = `\`\`\`**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**\`\`\``;   
  client.channels.cache.get('820541550572339230').send(content)
}
}