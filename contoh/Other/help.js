const { Default_Prefix, Color, Support, Donate, Dashboard } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");
//const { MessageEmbed } = require('discord.js')

//const { Menu } = require('discord.js-menu')
module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Other",
  description: "Bot Help Command ;)",
  usage: "Help | <Command Name>",
  run: async (client, message, args) => {
    let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    
    const Config = client.commands.filter(cmd => cmd.category === "Config").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const search = client.commands.filter(cmd => cmd.category === "Search").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const Other = client.commands.filter(cmd => cmd.category === "Other").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    const test = client.commands.filter(cmd => cmd.category === "test").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
  
    
    const Embed = new Discord.MessageEmbed()
  
    .setColor(Color)
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
    .setTitle(`${client.user.username} Help You!`)
    .setDescription(`Command Information -\n**${Prefix}Help <Command Name>**\n\n**🔍 Search**\n${search}\n\n**🔮 Other**\n${Other}\n\n**🕹 Config**\n${Config}\n\n**test**\n${test}\n\nUseful Links:\nBot Link - [Click Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\n`)
    .setFooter(`Requested By ${message.author.username}`)
    .setTimestamp();
   
    
    
     
    if (!args[0]) return message.channel.send(Embed);
    
    let command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
       if (!command) return message.channel.send(`No Command Found - ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
    .setTitle(`Command Information!`)
    .addField(`Name`, command.name.charAt(0).toUpperCase() + command.name.slice(1), true)
    .addField(`Category`, command.category || "No Category", true)
    .addField(`Aliases`, command.aliases ? command.aliases.join(", ") : "No Aliases", true)
    .addField(`Usage`, command.usage, true)
    .addField(`Description`, command.description)
    .setFooter(`Requested By ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embeded);
 }}