const db = require("quick.db");
const MessageEmbed = require("discord.js");
const DISCORD = require("discord.js");
module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  run: (client, message, args) => {
   message.delete()
    const user = message.mentions.members.first() //|| message.author;
    if (!user) return message.channel.send("Please Give User mention");
    const u = args[0];
    if (!u) return message.channel.send("warnings <@user>");
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;
  if(message.mentions.users.first().bot) {

      return message.channel.send("You can not warnings bots")

    }
  if(user.id === message.guild.owner.id) {

      return message.channel.send("You jerk, how you can warnings server owner -_-")

    }

  
  
    message.channel.send(
      new DISCORD.MessageEmbed()
        .setTitle("MODERATION WARN")
        .setDescription(
          `<a:right:798696415089262632> Name User:\n<a:Right:797490924241813505> ${user}\nThe number of members in the Warn: \n<a:right:798696415089262632> Warn:\`\`\`\n${warnings}\n\`\`\``
        )
        .setColor("RED")
    );
  }
};
