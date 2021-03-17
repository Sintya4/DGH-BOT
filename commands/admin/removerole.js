const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "removerole",
  description: "Remove role in the guild",
  category: "admin",
  args: true,
  permissions:"MANAGE_ROLES" || "ADMINISTRATOR",
  usage: "removerole <Name>",
  run: async (client, message, args) => {
    let roleDelete =
        message.guild.roles.cache.get(args[1]) ||
        message.guild.roles.cache.find((r) => r.name == args[1]);
      if (!roleDelete)
        return message.channel.send(
          `You did not specify the name or id of the role you wish to delete!`
        );
      roleDelete.delete();
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username} - (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .setColor("RANDOM").setDescription(`
**Role Delete: ** ${name}
**Action: ** New Role Created
**Role Color: ** ${args[0]}
**Channel: ** ${message.channel}
**By: ** ${message.member}
      `);
    message.channel.send(embed);
  }
};
