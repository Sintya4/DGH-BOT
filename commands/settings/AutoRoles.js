const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "autoroles555",
  category: "settin",
  args: true,
  usage: "autoroles <@roles>",
  description: "Set the Roles Welcome",
  run: (client, message, args) => {
       const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(0)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(0));
   if (!role) {
      return message.channel.send("Please provide a valid role");
   }
        const wel = new Discord.MessageEmbed()
          .setDescription(`**Done** From now on I will autoRoles\n\`${role.name}\``)
          .setColor("RED");
      return  message.channel.send(wel);
         db.set(`roles_${message.guild.id}`, role.id);
    }
    }
 