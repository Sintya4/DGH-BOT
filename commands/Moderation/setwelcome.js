const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel> <message>",
  args: true,
  owner: true,
  description: "Set the welcome channel",
  run: (client, message, args) => {
    let channel = message.mentions.channels.first();

    //Now we gonna use quick.db
    let say = args.slice(1).join(" ");
 

    db.set(`welchannel_${message.guild.id}`, channel.id);

    message.channel
      .send(`Welcome Channel is seted as ${channel}`)
      .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
  }
};
