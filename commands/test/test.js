const ms = require("ms");
const Discord = require("discord.js");

module.exports = {
  name: "stopwatch",
  usage: `stopwatch <time> <second / minute / hour / day>`,
  category: "category",
  description: "",
  args: true,
  cooldown: 1,
  permission: "",
  run: async (client, message, args) => {
    const input = args[0];
    const input2 = args[1];
    const reply = 1500 || input2.replace(`s`, 1500).replace(`m`, 50000).replace(`h`, 3500000).replace(`d`,86300000)
    const Ss = reply;
 // Code Cooldown Mode
const db = require("quick.db")
const now = Date.now()
if(db.has(`cd_${message.author.id}`)) {
  const expirationTime = db.get(`cd_${message.author.id}`) + 3000
  if(now < expirationTime) {
  const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more ${input2});
  }
}
  db.set(`cd_${message.author.id}`, now);
  setTimeout(() => {
    db.delete(`cd_${message.author.id}`)
  },3000) 
  var remainingTime = input,
      remainingCount = 1,
      status = "⏱️";
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField("Loading-Time", `Started! **${remainingTime}${input2 || "s"}** ${status}`)
        .setColor("RANDOM")
    );
    let clock = setInterval(() => {
      remainingTime--;
      countdown.edit(
        new Discord.MessageEmbed()
          .addField("Start-Time", `**${remainingTime}${input2 || "s"}** remain ${status}`)
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField("Stop-Time", `Done **${remainingTime}${input2 || "s"}** ${status}`)
            .setColor("RANDOM")
        );
      }
    }, Ss);
  }
};
