const { Message, MessageEmbed } = require("discord.js");
//const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
//const db = require("wio.db");
const moment = require("moment");
const fetch = require("node-fetch");
const url = require("url");

module.exports = {
  name: "covidall",
  aliases: ["Covid-19"],
  category: "search",
  description: "Covid-19",
  usage: "Covid-19",
  run: async (client, message, args) => {
    message.delete();
   const data = await api.all()
    const coronaembed = new Discord.MessageEmbed()
    .setColor("#00f8ff")
    .setTitle("Global Cases")
    .setDescription("Number of cases may be differ from other sources")
    .addField("Cases", data.cases, true)
    .addField("Active", data.active, true)
    .addField("Cases Today", data.todayCases, true)
    .addField("Critical Cases", data.critical, true)
    .addField("Deaths", data.deaths, true)
    .addField("Recovered", data.recovered, true)
    message.channel.send(coronaembed)
  }} 