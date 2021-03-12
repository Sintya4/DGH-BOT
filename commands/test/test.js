const ms = require("ms");
const Discord = require("discord.js");

module.exports = {
  name: "stopwatch",
  usage: `stopwatch <time> <second / minute / hour / day>`,
  category: "category",
  description: "",
  args: false,
  cooldown: 0,
  permission: "",
  run: async (client, message, args) => {
     const input = args[0].replace(`s`,`second`).replace(`m`,`minute`).replace(`h`,`hour`).replace(`d`,`day`)
    var remainingTime = args[0],
      remainingCount = 1,
      status = "⏱️";
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField("TIME", `Started! **${remainingTime}** ${status}`)
        .setColor("RANDOM")
    );
                 let clock = setInterval(() => {
   remainingTime--;
      countdown.edit(
        new Discord.MessageEmbed()
          .addField("Time", `**${remainingTime}** remain ${status}`)
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField("TIMEAUT", `Done **${remainingTime}** $ ${status}`)
            .setColor("RANDOM")
        );
      }
    }, ms(input || 1500));
  }
}
