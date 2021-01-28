const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
module.exports = {

  name: "view",

  category: "moderation",

  description: "Get bot ping :/",

  usage: "view <msg>",

  run:    
    async (client, message, args) => {
message.delete()
        //Sort your commands into categories, and make seperate embeds for each category

        const setmsg = new Discord.MessageEmbed()
        .setTitle('MESSAGE SETUP 1/2')
        .addField('`=setlevelmsg`', 'settings msg level')
        .addField('`=sethelpmsg`', 'settings msg help')
        .addField('`=setplaystoremsg`', 'settings msg playstore')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('MESSAGE SETUP 2/2')
        .addField('`=setssmsg`', 'settings msg ss')
        .addField('`=setmathmsg`', 'settings msg math')
        .setTimestamp()

       /* const utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .addField('`;global`', 'Track the amount of COVID-19 cases globally')
        .addField('`;country`', 'Tracks a specified country\'s COVID-19 cases')
        .addField('`;ping`', 'Get the bot\'s API ping')
        .addField('`;weather`', 'Checks weather forecast for provided location')
        .setTimestamp()*/

        const pages = [
                setmsg,
                fun
               // utility
        ]

        const emojiList = ["⏪", "⏩"];

      //  const timeout = '120000';

        pagination(message, pages, emojiList)
    }
}