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
    const upt = "5s"
   //return message.channel.send("Check your Ping now").then((sentMessage) => setTimeout (function(){ sentMessage.edit(`Latency: ${client.ws.ping}/API Latency ${(client.ping)}ms`)},ms(upt))
   return message.channel.send("Check your Ping now").then((sentMessage) => setTimeout (function(){ sentMessage.edit(`Latency: ${client.ws.ping}/API Latency ${(client.ping)}ms`)},ms(upt) setTimeout (function(){
   )}}
   