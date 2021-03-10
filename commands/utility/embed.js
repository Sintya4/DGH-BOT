const db = require("quick.db");

const Discord = require("discord.js");
module.exports = {
  name: "embed",
  category: "utility",
  description: "Get bot embed :/",
  usage: "embed [...Text]\nembed -json [Raw JSON]",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    const [key, ...value] = args;
    switch (key) {
      case "-json": {
        try {
          const json = JSON.parse(args.slice(1).join(" "));
          return message.channel.send({
            embed: json
          });
        } catch (error) {
          return message.channel.send(
   "https://embedbuilder.nadekobot.me");
        }
      }
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true }) ||
            client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(args.join(" "))
    );
  }
};
