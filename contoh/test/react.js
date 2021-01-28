const { Default_Prefix, Color, Support, Donate, Dashboard } = require("../../config.js");
const Discord = require("discord.js");
const clinet = new Discord.Client();
const setupCMD = "$setreactionrole"
let initialMessage = ``
const reactions = ["✅"];
const db = require("wio.db");
module.exports = {
  name: "test",
  aliases: ["h"],
  category: "test",
  description: "--",
  usage: "react test",
  run: async (client, message, args) => {
     var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
   }})}
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
  messages.push(`**These Are The Simplest React Commands**`); //DONT CHANGE THIS
    return messages;

}}}


    
  

//Function to generate the role messages, based on your settings
 
 
 