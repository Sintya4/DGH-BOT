const discord = require("discord.js")
const { RichEmbed } = require("discord.js")
const fetch = require('node-fetch');
const moment = require("moment")
const hastebin = require('hastebin-gen');
module.exports = {

        name: "resett",

        usage: `r!hastebin <code/text>`,

        category: "utilit",

        aliases: ["haste"],

    run: async (client, message, args) => {

 let body = args.slice(0).join(' ');

    if (message.attachments.size > 0) {
        body = await (await fetch(message.attachments.first().url)).text();
    }

    const options = {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await (await fetch(`${client.config.hasteurl}/documents`, options)).json();

    message.channel.send(`:white_check_mark: | Posted text to Hastebin at this URL: ${client.config.hasteurl}/${res.key}`);

      }

}