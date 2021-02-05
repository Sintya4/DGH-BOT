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
    const upt = "8s"
     return message.channel.send(`Loading`).then((sentMessage) => sentMessage.edit(`Pong - ${Math.round(client.ws.ping)}`),ms(upt))
    
   }}
   