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
    var time = '';
            var time2 = '';
            var time3 = '';
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permission to execute this command.');
                const stated_duration_hours = message.content.split(' ')[1];
                const stated_duration_hours2 = stated_duration_hours.toLowerCase();
                if (stated_duration_hours2.includes('s')) {
                    var time = 's';
                }
                if (stated_duration_hours2.includes('m')) {
                    var time = 'm';
                }
                if (stated_duration_hours2.includes('h')) {
                    var time = 'h';
                }
                if (stated_duration_hours2.includes('d')) {
                    var time = 'd';
                }
                const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
                if (stated_duration_hours3 === '0') {
                    message.channel.send('The duration has to be atleast one.');
                }
                if (isNaN(stated_duration_hours3)) {
                    message.channel.send('The duration has to be a valid time variable.');
                }
               if (stated_duration_hours3 > 1) {
                    var time3 = 's';
                }
          if (time === 's') {
                    var actual_duration_hours = stated_duration_hours3 * 1000;
                    var time2 = 'second';
                }
                if (time === 'm') {
                    var actual_duration_hours = stated_duration_hours3 * 60000;
                    var time2 = 'minute';
                }
                if (time === 'h') {
                    var actual_duration_hours = stated_duration_hours3 * 3600000;
                    var time2 = 'hour';
                }
                if (time === 'd') {
                    var actual_duration_hours = stated_duration_hours3 * 86400000;
                    var time2 = 'day';
                }
  /*   const input = args[0];
  
    var result = input.replace(`s`,`second`).replace(`m`,`minute`).replace(`h`,`hour`).replace(`d`,`day`)
  */  var remainingTime = args[0],
      remainingCount = 1,
      status = "⏱️";
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField("TIME", `Started! **${stated_duration_hours3}** ${time2}${time3} ${status}`)
        .setColor("RANDOM")
    );
                 let clock = setInterval(() => {
   remainingTime--;
      countdown.edit(
        new Discord.MessageEmbed()
          .addField("Time", `**${remainingTime}** ${time2}${time3} remain ${status}`)
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField("TIMEAUT", `Done ${time} **${stated_duration_hours3}** ${time2}${time3} ${status}`)
            .setColor("RANDOM")
        );
      }
    }, actual_duration_hours);
  }
}
