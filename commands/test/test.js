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
    const input = args[0];
    const input2 = args[1];
    const reply = input2.replace(`s`, 1500).replace(`m`, 50000).replace(`h`, 3500000).replace(`d`,86300000)
    const Ss = reply;
    var remainingTime = input,
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
            .addField("TIMEAUT", `Done **${remainingTime}** ${status}`)
            .setColor("RANDOM")
        );
      }
    }, Ss || 1500);
  }
};
