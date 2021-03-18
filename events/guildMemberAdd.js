const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment-timezone");
module.exports = async client => {
  client.on("message", message => {
    var msg = `${Date.now() - message.createdTimestamp}`;
  });
  //fires every time when someone joins the server
  client.on("guildMemberAdd", async member => {
    let image = db.get(`welimage_${member.guild.id}`);
    const canvas = Canvas.createCanvas(1772, 633);
    const ctx = canvas.getContext("2d");
    //set the Background to the welcome.png
    const background = await Canvas.loadImage(
      `${image ||
        "https://cdn.glitch.com/02e867ae-7c7c-4637-ace7-66ea251fe9d5%2Fthumbnails%2Fwelcome.png?1613195262594"}`
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    var textString3 = `${member.user.username}`;
    if (textString3.length >= 14) {
      ctx.font = "bold 100px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    } else {
      ctx.font = "bold 150px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }
    var textString2 = `#${member.user.discriminator}`;
    ctx.font = "bold 40px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString2, 730, canvas.height / 2 + 58);
    var textString4 = `Member #${member.guild.memberCount}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 750, canvas.height / 2 + 125);
    var textString4 = `${member.guild.name}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 700, canvas.height / 2 - 150);
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );
    var date = moment.tz("Asia/Jakarta");
    let chx = db.get(`welchannel_${member.guild.id}`);
    let wrt = await db.fetch(`roles_${member.guild.id}`);
    let ch =
      db.get(`welmsg_${member.guild.id}`) || "welcome to my server {member}";
    const messs = ch
      .replace(`{member}`, member) // Member mention substitution
      .replace(`{username}`, member.user.username) // Username substitution
      .replace(`{position}`, member.guild.members.cache.size)
      .replace(`{tag}`, member.user.tag) // Tag substitution
      .replace(`{date}`, date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
      .replace(`{server}`, member.guild.name) // Name Server substitution
      .replace(`{size}`, member.guild.members.cache.size);
    const welcomeembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(messs)
      .setImage("attachment://welcome-image.png")
      .attachFiles(attachment);
    const sender = client.channels.cache.get(chx);
    if (wrt === null) return;
    let role = await member.guild.roles.cache.get(wrt);
    await member.roles.add(role);
    sender.send(welcomeembed);
  });
};
