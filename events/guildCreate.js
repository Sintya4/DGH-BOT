const Discord = require("discord.js");
const MessageEmbed = require ("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = async (client) => {

const description = {
    name: "Guilds Create",
    filename: "Guilds.js",
    version: "4.8"
  };
  //log that the module is loaded
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  );
client.on('guildCreate', async guild => {
    if (!guild.available) return;

    const embed = new Discord.MessageEmbed()
        .setTitle("Hello, I'm DGH BOT!")
        .setAuthor(`${client.user.displayAvatarURL()}`)
        .addField(`You've just added me to **${guild.name}**.\n\nHere is some information about myself:\n\nMy Prefix:\`!help|mention\`\nCommands: Moderation, Settings, misc, welcome, utility`, true)
        .addField('My Dashboard, Sorry My dashboard in Glitch.com :(', '[Here](https://bot-jsll.glitch.me/)', true)
	      .setTimestamp()// moment().format('LLL'),
        .setFooter(`${client.user.tag}`);
    guild.owner.send(embed);
})}