const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "level",
  category: "misc",
    description: 'level',
  run: async (client, message, args, del, member) => {
   message.delete();

    let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)

    if(messagefetch == null) messagefetch = '0';
    if(levelfetch == null) levelfetch = '0';

    const embed = new Discord.MessageEmbed()
    .setDescription(`${message.author}, You Are Level: \`${levelfetch}\` & Have Sent: \`${messagefetch}\` Messages`)

    message.channel.send(embed)

  
  }}