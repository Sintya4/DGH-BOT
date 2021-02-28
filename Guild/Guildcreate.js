const Discord = require("discord.js");
const MessageEmbed = require ("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = function(client) {
  const description = {
    name: "Guilds Create",
    filename: "Guilds.js",
    version: "4.8"
  };
  //log that the module is loaded
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  );
client.on('guildCreate', async (guild) => {
    if (!guild.available) return;

    const embed = new MessageEmbed({
        author: {
            name: "Hello, I'm DGH BOT!",
            iconURL: client.user.displayAvatarURL()
        },
        description: `You've just added me to **${guild.name}**.\n\nHere is some information about myself:\n\n`,

        timestamp: moment().format('LLL'),
        footer: {
            text: client.user.tag
        }
    });

    guild.owner.send({embed});
})};