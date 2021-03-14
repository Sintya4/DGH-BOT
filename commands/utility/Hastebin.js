const discord = require("discord.js")
const { RichEmbed } = require("discord.js")
const fetch = require('node-fetch');
const moment = require("moment")
const sourcebin = require('sourcebin_js');
module.exports = {
        name: "haste",
        usage: `haste <code/text>`,
        category: "utility",
        aliases: ["haste"],
    run: async (client, message, args) => {
 
    sourcebin.create([{
      name: `args[0],
      content: args.join('\n'),
      languageId: 'JavaScript'
    }])
      .then(src => {

      let embed = new discord.MessageEmbed()
      .setTitle(`Hastebin`)
      .setDescription(`**[Url](${src.url})**`)
      message.channel.send(embed);
    })
  .catch(e => {
         message.channel.send(`Error, try again later`)
   });
      
  }}