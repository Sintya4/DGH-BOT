const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../../level-xp/xp.js");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "info",
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    if(user.id === client.user.id) { //IF BOT
      return message.channel.send(":wink: | I am on level 100")
    }

    if(user.bot) {
      return message.channel.send("Bot do not have levels")
    }

   let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    const {level, remxp, levelxp} = getInfo(xp);

const rank = new canvacord.Rank()
    .setAvatar(user.displayAvatarURL({dynamic: false,  format: 'png'}))
    .setCurrentXP(remxp)
    .setRequiredXP(levelxp)
    .setLevel(level)
    .setStatus(user.presence.status)
    .setProgressBar("#00FFFF", "COLOR")
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(1, "a", false)
    .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/815383261966499840/815384721227382784/card.jpg%22");

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "automodRankcard.png");
        message.channel.send(attachment);
    });




  }
}


/*module.exports = {
  name: "level",
  description: "Get the level of author or mentioned",
  usage: "level <user>",
  cooldown: 1,
  category: "info",
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    if (user.id === client.user.id) {
      //IF BOT
      return message.channel.send("😃 | I am on level ∞");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels -_");
    }

    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

    const { level, remxp, levelxp } = getInfo(xp);
    if (xp === 0)
      return message.channel.send(`**${user.tag}** is out of the xp`);
    let embed = new discord.MessageEmbed()
      .setAuthor(user.username, message.guild.iconURL())
      .setColor("#ff2050")
      .setThumbnail(user.avatarURL())
      .setDescription(
        `**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`
      );
    message.channel.send(embed);
  }
};
*/