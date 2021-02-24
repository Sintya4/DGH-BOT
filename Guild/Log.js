const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = function(client) {
  const description = {
    name: "Log mod",
    filename: "log.js",
    version: "4.8"
  };
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  )



}