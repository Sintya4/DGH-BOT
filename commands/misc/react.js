const db = require("quick.db");
const fs = require("fs")

module.exports = {

  name: "react",

  category: "Misc",

  description: "Get bot ping :/",

  usage: "react <emoji>",
  args: true,

  run: async (client, message, args, del, member) => {
   message.delete();
 
  
    if (!args[0]) {
      return message.channel.send("<a:failed:798526823976796161> Please give website link to monitor", message, "RED");
    }

   
    let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));

    }  }