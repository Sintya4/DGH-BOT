const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = function(client) {
  const description = {
    name: "welcomeImages",
    filename: "welcome.js",
    version: "4.8"
  };
  //log that the module is loaded
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  );
  client.on("message", message => {
    var msg = `${Date.now() - message.createdTimestamp}`;
  });
  //fires every time when someone joins the server
  client.on("guildMemberAdd", async member => {
    //If not in a guild return
    //   if(!member.guild) return;
    //create a new Canvas
        let image = db.get(`welimage_${member.guild.id}`);
 
    const canvas = Canvas.createCanvas(1772, 633);
    //make it "2D"
    const ctx = canvas.getContext("2d");
    //set the Background to the welcome.png
    const background = await Canvas.loadImage(
    `${image || "https://cdn.glitch.com/02e867ae-7c7c-4637-ace7-66ea251fe9d5%2Fthumbnails%2Fwelcome.png?1613195262594"}`
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    //set the first text string
    var textString3 = `${member.user.username}`;
    //if the text is too big then smaller the text
    if (textString3.length >= 14) {
      ctx.font = "bold 100px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }
    //else dont do it
    else {
      ctx.font = "bold 150px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }
    //define the Discriminator Tag
    var textString2 = `#${member.user.discriminator}`;
    ctx.font = "bold 40px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString2, 730, canvas.height / 2 + 58);
    //define the Member count
    var textString4 = `Member #${member.guild.memberCount}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 750, canvas.height / 2 + 125);
    //get the Guild Name
    var textString4 = `${member.guild.name}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 700, canvas.height / 2 - 150);
    //create a circular "mask"
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip();
    //define the user avatar
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    //draw the avatar
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
    //get it as a discord attachment
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );
   /*  const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
   const emoji = this.client.emojis.get(match[1]);
 */ //define the welcome embed
    //define the welcome channel
    //send the welcome embed to there
   // data.timestamp
    let UserAt = member
    let chx = db.get(`welchannel_${member.guild.id}`);
   let ch = db
      .get(`welmsg_${member.guild.id}`)
      .replace(`{user}`, member) // Member mention substitution
      .replace(`{member}`, member) // Member mention substitution
      .replace(`{username}`, member.user.username) // Username substitution
      .replace(`{tag}`, member.user.tag) // Tag substitution
      .replace(
        `{date}`, moment(UserAt.joinedAt).format('DD/MMM/YYYY HH:mm:ss A', ['en']))// member guild joinedAt
      .replace(`{server}`, member.guild.name) // Name Server substitution
      .replace(`{size}`, member.guild.members.cache.size);
    //  const json = JSON.parse(ch);
    const welcomeembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      //  .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
      .setDescription(ch)
      .setImage("attachment://welcome-image.png")
      .attachFiles(attachment);
    const sender = client.channels.cache.get(chx);
    sender.send(welcomeembed);
    /* sender.send({
      embed: json
    });*/
  });
};
  