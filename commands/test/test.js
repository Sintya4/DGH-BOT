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
    //code
    const time = args[0];
    const input = args[1];
    var result = input.replace(`s`,`second`).replace(`m`,`minute`).replace(`h`,`hour`).replace(`d`,`day`)
    var remainingTime = time,
      remainingCount = 1,
      status = "⏱️";
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField("TIME", `Started! ${time} ${result} ${status}`)
        .setColor("RANDOM")
    );
    let clock = setInterval(() => {
      remainingTime--;
      countdown.edit(
        new Discord.MessageEmbed()
          .addField("Time", `${remainingTime} ${result} remain ${status}`)
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField("TIMEAUT", `Done ${time} ${result} ${status}`)
            .setColor("RANDOM")
        );
      }
    }, 1500);
  }
};
