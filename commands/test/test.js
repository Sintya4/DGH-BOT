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
 /*   const ma = ti
      .replace(`${ti}s`, `second`)
      .replace(`${ti}m`, `minute`)
      .replace(`${ti}h`, `hour`)
      .replace(`${ti}d`, `day`);*/
    const embed = new Discord.MessageEmbed()
      .addField("TIME", `Started! ${ti} `)
      .setColor("RANDOM");
   /* const embed2 = new Discord.MessageEmbed()
   .addField(", `${ti}  remain`)
      .setColor("RANDOM");*/
   const embed3 = new Discord.MessageEmbed()
      .addField("TIMEAUT", `Done ${ti} `)
      .setColor("RANDOM");

    var remainingTime = ti,
      remainingCount = 1,
      status = "⏱️";

    var countdown = await message.channel.send(embed);

    let clock = setInterval(() => {
      remainingTime--;

      if (remainingTime == 1) remainingCount++;

      countdown.edit(new Discord.MessageEmbed()
      .addField("Time", `${remainingTime}  remain`)
      .setColor("RANDOM"));

      if (remainingCount == 10) {
        clearInterval(clock);
      }

      if (remainingTime == 0 && remainingCount % 2 == 0) {
        status = "⏱️";
  (embed3)
      //  remainingTime += 5;
      }

      // looks like dirty code but this works instead of

      // else { status = 'working' if ... }
      /*
    else if (remainingTime == 0 && remainingCount == 9) {

        remainingTime += 20;

        status = 'working';

    }

    else if (remainingTime == 0) {

        remainingTime += 25;

        status = 'working';

    }
*/
    }, 3000);
  }
};
