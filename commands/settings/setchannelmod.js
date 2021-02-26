const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setlog",
  category: "settings",
  args: true,
  usage: "setlog <channel>",
  description: "Set the channel",
  run: (client, message, args) => {
    const channel = message.mentions.channels.first();
   if (!channel) {
          return message.channel.send(
            `${client.emotes.error}Pls Give Invalid channel... Try again...`
          );
        }
        db.set(`Mod`, channel.id);
        const welcome = new Discord.MessageEmbed()
          .setDescription(
            `**Done** From now on I will send message Log-mod in ${channel} when someone joins the server`
          )
          .setColor("RED");
        message.channel.send(welcome);
      }
    }
  
