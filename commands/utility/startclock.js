const db = require("quick.db");
const Discord = require('discord.js');
const ms = require("ms");
const gagal = `RED`;
module.exports = {
  name: "inbot",
  category: "utility",
  description: "Get bot link invite",
  usage: "inbot",
  run: async (client, message, args, msss) => {
    message.delete();
    const time =  ms(args[0])
    const reason = args.slice(1).join(" ");
    if(isNaN(time)) return message.reply("make sure to provide correct time.").then(msg => msg.delete(5000))
          if(reason == undefined || reason == null || reason.length < 1) return message.reply("you didn't specify what do you want to give away.").then(msg => msg.delete(5000))

       const embed = new Discord.MessageEmbed()
  
          .setTitle(reason)

          .setDescription(`Ends in: ${ms(time)}`)

          .setAuthor(message.author.tag, message.author.displayAvatarURL)

          .setTimestamp()

          .setFooter(client.user.username, client.user.displayAvatarURL)

          message.channel.send(embed).then(async msg => {

         
          const timeInterval = setInterval(function() {

            console.log(ms(msg.embeds[0].description.slice(9)))

            if(ms(msg.embeds[0].description.slice(9)) <= 5000) {

              const embed2 = new Discord.MessageEmbed()

         
          .setTitle(reason)

          .setDescription(`Ended.`)

          .setAuthor(message.author.tag, message.author.displayAvatarURL)

          .setTimestamp(msg.embeds[0].timestamp)

          .setFooter(client.user.username, client.user.displayAvatarURL)

            msg.edit(embed2)

              clearInterval(timeInterval)

            } 
            }, 5000)
          setTimeout(function() {
            msg.channel.fetchMessage(msg.id).then(mesg => {
                 const embed3 = new Discord.MessageEmbed()

         
          .setTitle(reason)

          .setDescription(`Ended.`)

          .setAuthor(message.author.tag, message.author.displayAvatarURL)

          .setTimestamp(msg.embeds[0].timestamp)

          .setFooter(client.user.username, client.user.displayAvatarURL)
 mesg.channel.send(embed3)
            })
          }, time)
        })
      }

    
    
    
    
}