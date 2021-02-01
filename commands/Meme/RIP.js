const db = require("quick.db");
const MessageEmbed= require ("discord.js")

module.exports = {

  name: "rip",

  category: "fun",

  description: "rip user meme",

  usage: "rip <@user>",
  args: true,

  run: async (client, message, args, del, member) => {
   message.delete();
    let say = args[0]
       let target = message.mentions.members.first();
 
   // const Channel = member.guild.channels.cache.get('797491226567114753') //insert channel id that you want to send to
    const rip = new MessageEmbed()
                        . setTitle (`RIP ${target.author}`)
                         . setDescription(`https://vacefron.nl/api/grave?user=${say}`)
                        
                        
                        message.channel.send(rip);
  

   }}