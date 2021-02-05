const { Default_Prefix, Color, Support } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");
module.exports = {
  name: "ping",
  aliases: ["ms"],
  category: "info",
  description: "Show Bot Ping!",
  usage: "Ping",
  run: async (client, message, args) => {
    const ms = require("ms")
    let time = '3s'
    setTimeout (function(){
      message.edit("Loading")
      },ms(time))
    let time1 = '3s'
    setTimeout (function(){
      message.edit("Loading")
      },ms(time1))
    let time2 = '3s'
    setTimeout (function(){
       return message.channel.send(`Pong - ${Math.round(client.ws.ping)}`)
    },ms(time2))
  }
};