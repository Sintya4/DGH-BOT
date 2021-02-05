const db = require("quick.db");

const Discord = require("discord.js");
module.exports = {
  name: "embed",
  category: "misc",
  description: "Get bot embed :/",
  usage: "embed <msg>",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    const [key, ...value] = args;
    switch (key) {
      case "inbot": {
        try {
          const json = JSON.parse(args.join(" "));
          return message.channel.send({
            embed: json
          });
        } catch (error) {
          return message.channel.send(
            `description: MessageEmbed Constructor! Supports JSON formatting if you know how to use them :P\`\`\`bash$ embed [...Message]$ embed -json {"title": "My title", "description": "My description"}$ embed -json {"author": {"name": "My author name", "icon_url": "url here"}, "description": "My description"}$ embed -json {"fields": [{"name": "My field name", "value": "My field value"}, {"name": "My field name", "value": "My field value", "inline": false}]}\`\`\``
          );
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
