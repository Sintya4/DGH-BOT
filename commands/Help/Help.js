const Discord = require("discord.js");
const { Message } = require("discord.js");
const ms = require("ms");
const db = require ("quick.db");

const category = new Discord.Collection();
category.set("Fun", "Indeed very cool **Fun commands**.");
category.set("Misc", "Miscellaneous commands! over over the door");
category.set("Utility", "**Utility** commands that can help you do better.");
category.set(
  "Moderation",
  "**Moderation** commands"
);
category.set(
  "Settings",
  "Fully **Customizable** Configurations. including simplistic interactive configuration setups."
);
category.set("Search", "Searching commands!");
category.set("Administrators", "Bot Staff Commands ONLY!");
category.set("Info", "Bot Invite Commands");

module.exports = {
        name: "help",
        description:
          "List all of my commands or show information about a specific command.",
        category: "Help",
  cooldown: 5 ,
  run: async (client, message, args, ) => {
    
  /**
   * @returns {Promise<Message|boolean>}
   * @param {Client} client
   * @param {Message} message
   * @param {Array<string>} args
   */
    const prefix = db.get(`Prefix_${message.guild.id}`)
      
                          message.delete().catch(O_o=>{}); // eslint-disable-line

	
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
              .filter(
                command =>
                  command.category.includes(args[0])
             )
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          );
        } else {
          embed.addField(`\u200b`, "\u200b");
        }
        return message.channel.send(embed);
      }
      const name = args[0].toLowerCase();
      const command =
        client.commands.get(name) ||
        client.commands.find(
          c => c.aliase && c.aliases.includes(name)
        );
      if (!command) {
      } else {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`**${command.name}** Command`)
          .setDescription(`${command.description}`)
          .addField(`Category`, `• ${command.category}`, true)
          .addField(`Cooldown`, `${ms(command.cooldown * 1000)}`, true);
        if (command.aliases && command.aliases.length !== 0)
          embed.addField(
            `Aliases`,
            `${command.aliases.join(", ")}`,
            true
          );
        if (command.permission)
          embed.addField(
            `Required Permission`,
            `\`\`\`html\n<${command.permission}>\n\`\`\``,
            false
          );
        if (
          command.options.clientPermissions &&
          command.options.clientPermissions.length !== 0
        )
          embed.addField(
            `Required Bot Permissions`,
            `\`\`\`html\n<${command.options.clientPermissions.join(
              "> <"
            )}>\n\`\`\``,
            false
          );
        if (command.options.usage)
          embed.addField(
            `Usage`,
            `\`\`\`html\n${command.options.usage}\n\`\`\``,
            false
          );
        if (command.options.donatorOnly)
          embed.setFooter("This command is exclusive only to donators");
        return message.channel.send(embed);
      }
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(0x00ffff)
        .setTitle("Commands")
        .setDescription(
          `🛡️ Join our for help and updates!\n\`\`\`xl\n${prefix}help [Category]\n\`\`\``
        )
        .addField(
          `⚙️ Moderation`,
          `\`moderation\``,
          true
        )
        .addField(
          `🔧 Settings`,
          `\`settings\``,
          true
        )
        .addField(`🎫 Ticket System`, `\`ticket\``, true)
        .addField(`♾️ Dynamic Text/Voice`, `\`dynamic\``, true)
        .addField(
          `📜 Utility`,
          `\`utility\``,
          true
        )
        .addField(`🔍 Search`, `\`search\``, true)
        .addField(`📋 Misc`, `\`misc\``, true)
        .addField("😂 Fun", `\`fun\``, true)
        .addField("💠 Support", `\`info\``, true)
        .setTimestamp()
    );
  }
};
