const { Message, MessageEmbed } = require("discord.js");
const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
  name: "ss",
  aliases: ["newprefix"],
  category: "Search",
  description: "Takes a screenshot of any webpage.",
  usage: "screenshot <URL>",
  run: async (client, message, args) => {
    const urls = args[0];
    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );
      message.react('✅');
      return message.channel.send(
        `Here is a screenshot from requested URL [Clink Here](${urls})`,
        {
          files: [{ attachment: body, name: "Screenshot-Houston-Greatest.png" }]
        }
      );
    } catch (err) {
      if (err.status === 404)
        return message.channel.send("Could not find any results. Invalid URL?");
      return message.reply(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  }
};
