const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "setting",
  args: true,
  permission: "MANAGE_GUILD",
  description: "Set The Prefix Of Bot!",
  usage: "Setprefix <New Prefix>",
  run: async (client, message, args) => {
   
    let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    
    const NewPrefix = args.join(" ");
    
    if (!NewPrefix) return message.channel.send("Please Give New Prefix Of Bot!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix.length > 10) return message.channel.send("Too Long Prefix - 10 Limit").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix === Prefix) return message.channel.send("Given Prefix Is The Current Prefix!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();
    
    const Embed2 = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Server ${message.guild.name}\nBy ${message.author.username}`)
    .setTimestamp();
    
    await db.set(`Prefix_${message.guild.id}`, NewPrefix);
    
    try {
      return message.channel.send(Embed).then(m=>m.delete({timeout:6000}).catch(e=>{}));
    } catch (error) {
      return message.channel.send(`New Prefix Has Been Setted - ${NewPrefix}`);
    };
  }
};