const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../../level-xp/xp.js");
const { MessageEmbed } = require("discord.js");
const gagal = `RED`;
module.exports = {
  name: "level",
  description: "Get the level of author or mentioned",
  usage: "level <user>",
  cooldown: 10,
  category: "misc",
  run: (client, message, args, mass) => {
    message.delete();
    const user = message.mentions.users.first() || message.author;

    if (user.id === client.user.id) {
      //IF BOT

      return message.channel.send("😉 | I am on level 500");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

    const { level, remxp, levelxp } = getInfo(xp);

    if (xp === 0)
      return message.channel.send(`**${user.tag}** is out of the xp`);

    const embed = new discord.MessageEmbed()

      .setAuthor(user.username, message.guild.iconURL())

      .setColor("#ff2050")

      .setThumbnail(user.avatarURL()).setDescription(`**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`);

    return;
    message.channel.send(embed).then(m => {
      m.react("✅");

      m.react("❌");
    });
  }
};
