const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
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
  //fires every time when someone joins the server
  client.on("guildMemberAdd", async member => {
    //If not in a guild return
    //   if(!member.guild) return;
    //create a new Canvas
    const canvas = Canvas.createCanvas(1772, 633);
    //make it "2D"
    const ctx = canvas.getContext("2d");
    //set the Background to the welcome.png
    const background = await Canvas.loadImage(
      `https://cdn.discordapp.com/attachments/793391952334422076/794501192469839901/OIP.jpg`
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
      "welcome.png"
    );
    //define the welcome embed
    const messageembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
   /*     .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome to ${member.guild.name}!**
      Hi <@${member.id}>!, read and accept the rules!`)*/
        .setImage(
        "attachment://welcome.png"
      )
      .attachFiles(attachment);
   //define the welcome channel
    //send the welcome embed to there
    let chx = db.get(`welchannel_${member.guild.id}`);
    const sendr = await client.channels.cache.get(chx);
    let ch = db
      .get(`message_${member.guild.id}`)
      .replace(`{member}`, member) // Member mention substitution
      .replace(`{username}`, member.user.username) // Username substitution
      .replace(`{image}`, await sendr.send(messageembed))
      .replace(`{tag}`, member.user.tag) // Tag substitution
      .replace(`{time}`, Date.now())
      .replace(`{server}`, member.guild.name) // Name Server substitution
      .replace(`{size}`, member.guild.members.cache.size);
    const json = JSON.parse(ch);
    const sender = await client.channels.cache.get(chx);
    const exampleEmbed = json
    const exampleEmbed2 = {
    title: 'Some title',
    image: {
        url: 'attachment://discordjs.png',
    },
};
    
    return sender.send({
      embed: files: [file], exampleEmbed 
    });
  });
};
