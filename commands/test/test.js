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
    const ma = ti
      .replace(`s`, `second`)
      .replace(`m`, `minute`)
      .replace(`h`, `hour`)
      .replace(`d`, `day`);
    const embed = new Discord.MessageEmbed()
      .addField("TIME", `Started! ${ti} ${ma}`)
      .setColor("RANDOM");
    const embed2 = new Discord.MessageEmbed()
      .addField("TIME", `${ti} ${ma} remain`)
      .setColor("RANDOM");

    var remainingTime = ms(ti),
      remainingCount = 1,
      status = "⏱️";

    var countdown = await message.channel.send(embed);

    let clock = setInterval(() => {
      remainingTime--;

      if (remainingTime == 1) remainingCount++;

      countdown.edit(embed2);

      if (remainingCount == 10) {
        clearInterval(clock);
      }

      if (remainingTime == 0 && remainingCount % 2 == 0) {
        status = "⏱️";

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
    }, 10000);
  }
};
