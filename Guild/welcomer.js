const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const db = require("quick.db");
const { Discord, discord} = require ("discord.js")
module.exports = function(client) {
  const description = {
    name: "WelcomeImages",
    filename: "welcome.js",
    version: "4.8"
  };
  //log that the module is loaded
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  );
  client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  
   let data = await canva.goodbye(member, { link: "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg" })
 
    const attachment = new discord.MessageAttachment(
      data,
      "welcome.png"
    );
  
  


  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);
});

}