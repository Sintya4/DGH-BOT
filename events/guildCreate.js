const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = async client => {
  client.on("guildCreate", async guild => {
    if (!guild.available) return;

    const embed = new Discord.MessageEmbed()
      .setTitle("Hello, I'm DGH BOT!")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField(
        "Information",
        `You've just added me to **${guild.name}**.\n\nHere is some information about myself:\n\nMy Prefix:\`!help|mention\`\nCommands: Moderation, Settings, misc, welcome, utility`,
        true
      )
      .addField(
        "My Dashboard",
        " Sorry My dashboard in Glitch.com :( [Here](https://bot-jsll.glitch.me/)",
        true
      )
      .setTimestamp() // moment().format('LLL'),
      .setFooter(`${client.user.tag}`);
    const embed2 = new Discord.MessageEmbed()
      .setTitle("Hai, Saya Adalah DGH BOT")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField(
        "Informasi",
        `Kamu Telah Tambahkan Saya Di **${guild.name}**.\n\nDi Sini Saya Akan Memberi Informasi Saya:\n\nPrefix Saya:\`!help|mention\`\nCommands: Moderation, Settings, misc, welcome, utility`,
        true
      )
      .addField(
        "Dashboard Saya",
        "Maaf Jika Dashboard Saya Di glitch.com :( [Click Di sini](https://bot-jsll.glitch.me/)",
        true
      )
      .setTimestamp() // moment().format('LLL'),
      .setFooter(`${client.user.tag}`);
    guild.owner.send(embed).then(m => {
      m.react("🇬🇧");
      m.react("🇮🇩");
      const filter = (reaction, user) => {
        return (
          ["🇬🇧", "🇮🇩"].includes(reaction.emoji.name)
        );
      };

      m.awaitReactions(filter, { max: 600 }).then(
        collected => {
          const reaction = collected.array()[collected.size - 1];

          if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

          if (reaction.emoji.name === "🇬🇧") {
            m.edit(embed);
          }
          if (reaction.emoji.name === "🇮🇩") {
            m.edit(embed2);
          }
        }
      );
    });
  });
};
