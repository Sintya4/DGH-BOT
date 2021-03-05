const Discord = require("discord.js");
module.exports = {
  name: "nickname",
  usage: `nickname <text>`,
  category: "utility",
  description: "set nickname for member",
  args: true,
  cooldown: 1,
  permission: "",
  run: async (client, message, args) => {
    //code
    message.member
      .setNickname(args.join(" "))
      .catch(error => message.channel.send("Couldn't update your nickname."));
    const embed = new Discord.MessageEmbed()
      .addField(
        "NickName",
        `successfully replaced by name \`\`` + args.join(" ") + "``"
      )
      .setColor("GREEN");
    message.channel.send(embed);
  }
};
