const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
//const db = require("wio.db");
const db = require("quick.db");

module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "setting",
  description: "Set The Prefix Of Bot!",
  usage: "Setprefix <New Prefix>",
  args: true,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Server");
    
    let Prefix = await db.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    
    const NewPrefix = args.join(" ");
    
    if (!NewPrefix) return message.channel.send("Please Give New Prefix Of Bot!");
    
    if (NewPrefix.length > 10) return message.channel.send("Too Long Prefix - 10 Limit");
    
    if (NewPrefix === Prefix) return message.channel.send("Given Prefix Is The Current Prefix!");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();
 const DM = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Server ${message.guild.name}\nBy ${message.author.username}`)
    .setTimestamp();

  await db.set(`Prefix_${message.guild.id}`, NewPrefix);
  const usr = client.users.cache.get(message.guild.ownerID);

try{
   await message.channel.send(Embed)
  return usr.send(DM);

 } catch (error) {
      return message.channel.send(`New Prefix Has Been Setted - ${NewPrefix}`);
    };
  }
};