const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
permissions: "KICK_MEMBERS",
  args: true,
  run: (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
    }
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
    }
    
    let target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not kick yourself bro :-)`)
    }
       const reason = args.join(" ")
    let embed = new discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`Banned ${target} (${target.id})\nReason: ${reason ||"Not sure why the kick"}`)
    .setColor("#ff2050")
    .setFooter(`Banned by ${message.author.username}`);
     const member = message.guild.member(target)
    message.channel.send(embed)
    member.kick(reason||"you've been Kick");
    
    
    
  }
}