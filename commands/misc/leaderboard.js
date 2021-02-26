const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "top",
  category: "misc",
    description: 'top-lvl',
  run: async (client, message, args, del, member) => {
   message.delete();
 let Prefix = await db.get(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = `!`;
 
  const embed = new Discord.MessageEmbed()
    .setDescription(`Level Leaderboard: \`${Prefix}top levels\` || Message Leaderboard: \`${Prefix}top messages\``)
    .setColor("#FFFFFF")


  if(!args[0]) return message.channel.send(embed)

    if (args[0] == 'levels') {
    let level = db.get(`level_${message.guild.id}`)
    let content = "";

    for (let i = 0; i < level.length; i++) {
        let user = client.users.get(level[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${level[i].data}\n`
    
      }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Level Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'messages') {
    let messages = db.get(`messages_${message.guild.id}`)
    let content = "";

    for (let i = 0; i < messages.length; i++) {
        let user = client.users.get(messages[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${messages[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Messages Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)

  }
}}