const request = require('superagent');
const Discord = require('discord.js');
module.exports = {
        name: "joke",
        usage: `joke`,
        category: "fun",
        description: "",
        args: false,
        permission: "",
    run: async (client, message, args) => {
const { body } = await request
        .get('http://icanhazdadjoke.com/')
        .set('Accept', 'application/json');
        let jEmbed = new Discord.RichEmbed()
        .setTitle("Joke")
        .setDescription(body.joke)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
        message.channel.send(jEmbed);
    }}