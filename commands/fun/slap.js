const Discord = require("discord.js");
const superagent = require("snekfetch");
module.exports = {
  name: "slap",
  usage: `slap <@user>`,
  category: "fun",
  description: "slap member :v",
  args: true,
  cooldown: 2,
  permission: "",
  run: async (client, message, args) => {
    //code
    const user = message.mentions.users.first();
    if (!user)
      return message.channel.send({
        embed: {
          color: 16734039,
          description: "You must mention someone to slap!"
        }
      });

    if (message.author === user) {
      return await message.channel.send({
        embed: {
          color: 16734039,
          description: "You cant slap yourself!"
        }
      });
    }
    superagent
      .get("https://nekos.life/api/v2/img/slap")
      .end((err, response) => {
        const embed = new Discord.RichEmbed()
          .setTitle(
            user.username + " just got slapped by " + message.author.username
          )
          .setImage(response.body.url)
          .setColor(`RANDOM`)
          .setDescription(
            user.toString() + " got slapped by " + message.author.toString()
          )
          .setFooter(`That must hurt ._.`)
          .setURL(response.body.url);
        message.channel.send(embed);
      })
      .catch(err =>
        message.channel.send({
          embed: {
            color: 16734039,
            description: "Something went wrong... :cry:"
          }
        })
      );
  }
};