const db = require("quick.db");
const Discord = require("discord.js");
const ms = require("ms");
const gagal = `RED`;
module.exports = {
  name: "giveaway",
  category: "utility",
  description: "Get giveaway",
  args: true,
  usage: "giveaway <time> <winner> <reason>",
  run: async (client, message, args, msss) => {
    message.delete();
  let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: You have to mention a valid channel!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

}};/*    async function giv() {
            var time = '';
            var time2 = '';
            var time3 = '';
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permission to execute this command.');
                const stated_duration_hours = args[0];
                const winter = args[1];
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
                if (isNaN(winter)) {
                    message.channel.send('error the winner section is not a number');
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
                if (!isNaN(stated_duration_hours3)) {
                    const prize = args.slice(2).join(' ');
                    if (prize === '') return message.channel.send('You have to enter a prize.');
                    if (stated_duration_hours3 !== '0') {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('36393F')
                        .setDescription(`React with 🎉 to enter!\nTime duration: **${stated_duration_hours3}** ${time2}${time3}\nHosted by: ${message.author}`)
                        .setTimestamp(Date.now() + (actual_duration_hours))
                        .setFooter('Ends at')
                        let msg = await message.channel.send(':tada: **GIVEAWAY** :tada:', embed)
                        await msg.react('🎉')
                        setTimeout(() => {
                            msg.reactions.cache.get('🎉').users.remove(client.user.id)
                            setTimeout(() => {
                                let winner = msg.reactions.cache.get('🎉').users.cache.random();
                                if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                                    const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor('36393F')
                                    .setDescription(`Winner:\nNo one entered the giveaway.\nHosted by: ${message.author}`)
                                    .setTimestamp()
                                    .setFooter('Ended at')
                                    msg.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
                                }
                                if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                                    const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor('36393F')
                                    .setDescription(`Winner:\n${winner}\nHosted by: ${message.author}`)
                                    .setTimestamp()
                                    .setFooter('Ended at')
                                    msg.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
                                }
                            }, 1000);
                        }, actual_duration_hours);
                    }
                }
            }
        
        giv();
    }
}*/

  