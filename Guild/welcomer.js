const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const db = require("quick.db");
const { Discord } = require ("discord.js")
var jimp = require('jimp');
const canvas = require("discord-canvas");
module.exports = function(client) {
  const description = {
    name: "WelcomeImages",
    filename: "welcomer.js",
    version: "4.8"
  };
  //log that the module is loaded
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  );
  client.on("guildMemberAdd", async member => {
  let Channel = await db.get(`Welcome_${member.guild.id}`);
  if (!Channel) return;
  let Message = await db.get(`Welcome_${member.guild.id}`);
  if (!Message) Message = `Welcome To The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
    let Msg = Message.toLowerCase().replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
 .replace(`{member}`, member) // Member mention substitution
      .replace(`{username}`, member.user.username) // Username substitution
      .replace(`{tag}`, member.user.tag) // Tag substitution
      .replace(`{time}`, Date.now())
      .replace(`{server}`, member.guild.name) // Name Server substitution
      .replace(`{size}`, member.guild.members.cache.size);
    const json = JSON.parse(ch);
    
  let Welcomed = new canvas.Welcome();
  let Image = await Welcomed
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "jpg" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground("https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg")
  .toAttachment();
    let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
  
      const messageembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true })) 
        .setDescription(Msg)
        .setImage(
        "attachment://Welcome.png"
      )
      .attachFiles(Attachment);
  
  
  return client.channels.cache.get(Channel).send(messageembed);
})}