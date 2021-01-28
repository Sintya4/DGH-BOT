const { Default_Prefix, Color, Support } = require("../../config.js");

const Discord = require("discord.js");
const db = require("wio.db");
module.exports = {
  name: "bot",
  aliases: ["ms"],
  category: "test",
  description: "--",
  usage: "--",
  run: async (client, message, args) => {
   const msgg = args.join(" ");
   const ar = args
    if (!msgg) return message.channel.send("Please Give New Prefix Of Bot!");
    if (msgg.length > 10) return message.channel.send("Too Long Prefix - 10 Limit");
    if (isNaN(msgg))return message.reply("Ini bukan nomor")  
    return message.channel.send(`link Botnya adalah Clink di sini](https://discord.com/oauth2/authorize?client_id=${ar}&scope=bot&permissions=8)`)
 
  
     }

};