const Discord = require("discord.js");
const StopWatch = require("timer-stopwatch-dev"); 
const moment = require('moment');
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
      let guildTimers = CurrentTimers.get(message.guild.id);
     let guildTimersUser = guildTimers.get(message.author.id);
     if(!guildTimersUser){ guildTimers.set(message.author.id, new StopWatch()); guildTimersUser = guildTimers.get(message.author.id); };

 if(!args[0] || args[0] === 'start'){
   if(guildTimersUser.isRunning()) return message.channel.send(new Discord.RichEmbed().setTitle('⏱️You need to stop the Stopwatch first!⏱️').setDescription('Do `' + bot.prefix + 'stopwatch stop` to stop the Stopwatch!'));
   guildTimersUser.start();
   message.channel.send(new Discord.RichEmbed().setTitle('⏱️You have started the Stopwatch!⏱️').setFooter("🔑Join discord.gg/eNrCSvu for Support!🔑").setTimestamp());
 } else if(args[0] === 'stop'){
  if(!guildTimersUser.isRunning()) return message.channel.send(new Discord.RichEmbed().setTitle('⏱️You need to start the Stopwatch first!⏱️').setDescription('Do `' + bot.prefix + 'stopwatch start` to start the Stopwatch!'));
    guildTimersUser.stop();
    message.channel.send(new Discord.RichEmbed().setTitle('⏱️You have stopped the Stopwatch!⏱️').setDescription('Total Time: ' + dhm(guildTimersUser.ms)).setFooter("🔑Join discord.gg/eNrCSvu for Support!🔑").setTimestamp());
 }

 function dhm(ms){
  days = Math.floor(ms / (24*60*60*1000));
  daysms=ms % (24*60*60*1000);
  hours = Math.floor((daysms)/(60*60*1000));
  hoursms=ms % (60*60*1000);
  minutes = Math.floor((hoursms)/(60*1000));
  minutesms=ms % (60*1000);
  sec = Math.floor((minutesms)/(1000));
  return days+" days, "+hours+" hours, "+minutes+" minutes, "+sec+" seconds.";
}
}
}