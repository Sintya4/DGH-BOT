const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautoroles",
  category: "settings",
  args: true,
  usage: "setautoroles <@roles>",
  description: "Set the Roles Welcome",
  run: (client, message, args) => {
      let r = message.mentions.roles.first();
        const wel = new Discord.MessageEmbed()
          .setDescription(`**Done** From now on I will autoRoles\n\`${r.name}\``)
          .setColor("RED");
      return  message.channel.send(wel);
         db.set(`roles_${message.guild.id}`, r.id);
    }
    }
 