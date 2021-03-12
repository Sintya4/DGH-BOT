const ms = require("ms");
const Discord = require("discord.js");

module.exports = {
  name: "test",
  usage: `usage`,
  category: "category",
  description: "",
  args: false,
  cooldown: 0,
  permission: "",
  run: async (client, message, args) => {
    //code
    const ti = args[0];
    var remainingTime = ti,
      remainingCount = 1,
      status = "⏱️";

    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField("TIME", `Started! ${ti} `)
        .setColor("RANDOM")
    );

    let clock = setInterval(() => {
      remainingTime--;

    //  if (remainingTime == 0) remainingCount++;

      countdown.edit(
        new Discord.MessageEmbed()
          .addField("Time", `${remainingTime}  remain`)
          .setColor("RANDOM")
      );
if (remainingCount == 1) {

        clearInterval(clock);

    }

     else if (remainingTime == 1 && remainingCount % 2 == 0) {
        status = "⏱️";
      //  countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField("TIMEAUT", `Done ${ti} `)
            .setColor("RANDOM")
        );
        //  remainingTime += 5;
      }
    }, 2000);
  }
};
