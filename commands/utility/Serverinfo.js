const Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: 'Displays server information & statistics!',
   category: "utility",
  usage: "serverinfo",
  aliases: ['info','stats','serverstats','guildinfo','guildstats'],
  args: true,
      run: async (client, message, args) => {
   const embed = new Discord.MessageEmbed()  
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setColor(3447003)
  .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
  .addField('Member Count', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
  .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`, true)
  .addField('AFK Channel', `${message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.get(message.guild.afkChannelID).name} (${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})`, true)
  .addField('Location', message.guild.region, true)
  .addField('Created', message.guild.createdAt.toLocaleString(), true)
  .addBlankField(true)
  .setTimestamp()
  .setFooter(client.user.username, client.user.avatarURL);

  message.channel.send({embed});
}}