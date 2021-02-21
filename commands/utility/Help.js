const Discord = require("discord.js");
const { Message } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

const category = new Discord.Collection();
category.set("fun", "Indeed very cool **Fun commands**.");
category.set("misc", "Miscellaneous commands! over over the door");
category.set("utility", "**Utility** commands that can help you do better.");
category.set("moderation", "**Moderation** commands");
category.set(
  "settings",
  "Fully **Customizable** Configurations. including simplistic interactive configuration setups."
);
category.set("search", "Searching commands!");
category.set("administrators", "Bot Staff Commands ONLY!");
category.set("info", "Bot Invite Commands");

module.exports = {
  name: "help",
  description:
    "List all of my commands or show information about a specific command.",
  category: "utility",
  usage: "help [command | category]",
  cooldown: 5,
  run: async (client, message, args) => {
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    const prefix = db.get(`Prefix_${message.guild.id}`);

    message.delete().catch(O_o => {}); // eslint-disable-line

    if (args.length) {
      if (category.has(args[0])) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(args[0])}\n\`\`\`xl\nhelp [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(command => command.category.includes(args[0]))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          );
        return message.channel.send(embed);
      }
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Commands")
        .setDescription(
          `🛡️ Join our for help and updates!\n\`\`\`xl\n${prefix}help [Category]\n\`\`\``
        )
        .addField(`⚙️ Moderation`, `\`moderation\``, true)
        .addField(`🔧 Settings`, `\`settings\``, true)
        .addField(`📜 Utility`, `\`utility\``, true)
        .addField(`🔍 Search`, `\`search\``, true)
        .addField(`📋 Misc`, `\`misc\``, true)
        .addField("😂 Fun", `\`fun\``, true)
        .addField("💠 Support", `\`info\``, true)
        .setTimestamp()
    );
  }
};
