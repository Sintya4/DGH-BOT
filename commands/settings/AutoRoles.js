const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "autoroles",
  category: "settings",
  args: true,
  usage: "autoroles <key // welcome/leave> <@roles>",
  description: "Set the Roles",
  run: (client, message, args) => {
    const channel = message.mentions.channels.first();
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );

      case "leave.":
        {
          const msg = args.slice(1).join(" ");
          if (!msg) {
            return message.channel
              .send(
                `${client.emotes.error}\`Please give a message to welcomer ^(Must include ({member},{username},{tag},{server},{size},{date}) for this to work!)^\``
              )
              .then(m => m.delete({ timeout: 8000 }).catch(e => {}));
          }
          db.set(`levmsg_${message.guild.id}`, msg);
          const lev = new Discord.MessageEmbed()
            .setDescription(`**Done** From now on I will send\n\`${msg}\``)
            .setColor("RED");
          message.channel.send(lev);
        }
        break;
      case "welcome.": {
        const msg = args.slice(1).join(" ");
        if (!msg) {
          return message.channel
            .send(
              `${client.emotes.error}\`Please give a message to welcomer ^(Must include ({member},{username},{tag},{server},{size},{date}) for this to work!)^\``
            )
            .then(m => m.delete({ timeout: 8000 }).catch(e => {}));
        }

        db.set(`welmsg_${message.guild.id}`, msg);
        const wel = new Discord.MessageEmbed()
          .setDescription(`**Done** From now on I will send\n\`${msg}\``)
          .setColor("RED");
        message.channel.send(wel);
      }
    }
  }
};