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
    if (message.flags.includes('json')) {
            try {
                const json = JSON.parse(args.join(' '));
                return message.channel.send({
                    embed: json
                })
            } catch (error) {
                return message.channel.send(`\`ERROR\`\n\`\`\`xl\n${client.shorten(error, 512)}\n\`\`\``);
            }
        }
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(client.shorten(args.join(' '), 2048))
        );
    }}