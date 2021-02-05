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
    /*const ms = require("ms")
     const msg = await message.channel.send(`Loading`)
    let time1 = '2s'
    setTimeout (function(){
      msg.edit("Loading.")
      },ms(time1))
    let time2 = '3s'
    setTimeout (function(){
      msg.edit("Loading..")
      },ms(time2))
    let time3 = '4s'
    setTimeout (function(){
      msg.edit("Loading...")
      },ms(time3))
    let time4 = '5s'
    setTimeout (function(){
      msg.edit("Loading....")
      },ms(time4))
    let time5 = '6s'
    setTimeout (function(){
      msg.edit("Loading.....")
      },ms(time5))
    let time6 = '7s'
    setTimeout (function(){
      msg.edit("Loading")
      },ms(time6))
    let time7 = '8s'
    setTimeout (function(){
      msg.edit("Loading.")
      },ms(time7))
    let time8 = '9s'
    setTimeout (function(){
      msg.edit("Loading..")
      },ms(time8))
    let time9 = '10s'
    setTimeout (function(){
      msg.edit("Loading...")
      },ms(time9))*/
    let time10 = '11s'
    setTimeout (function(){
       msg.edit(`Pong - ${Math.round(client.ws.ping)}`)
    },ms(time10)
  }
};