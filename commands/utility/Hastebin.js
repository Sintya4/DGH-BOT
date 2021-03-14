const discord = require("discord.js")
const { RichEmbed } = require("discord.js")
const fetch = require('node-fetch');
const moment = require("moment")
const sourcebin = require('sourcebin_js');
module.exports = {
        name: "haste",
        usage: `haste <Name> <code/text>`,
        category: "utility",
        args: true,
        aliases: ["haste"],
    run: async (client, message, args) => {
    const Content = args.slice(1).join(" ")
    sourcebin.create([{
      title: "JavaScript code",
      description: "This code was created in ",
      name: "Made By" + message.author.username,
      content: Content,
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