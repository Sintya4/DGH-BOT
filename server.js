const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const db = require("quick.db");
const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");
const client = new Client({
  disableEveryone: true
});
const {
  Default_Prefix,
  Token,
  Support,
  id,
  Color,
  Dashboard
} = require("./config.js");
const { addexp } = require("./level-xp/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const cooldowns = new Discord.Collection();
client.queue = new Map();
/*=====================================================================*/
client.config = require("./config/bot");
client.message = require("./config/bot");
client.emotes = client.config.emojis;
/*=====================================================================*/
//<ACTIVITY>
client.on("ready", async () => {
  console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
  client.user.setActivity(
    `Commands: ${Default_Prefix}help\n ${client.guilds.cache.size} Server | ${client.users.cache.size} User
   `,
    { type: "WATCHING" }
  );
});
/*====================================================================*/
const { readdirSync } = require("fs");
let modules = ["./commands/../"];
readdirSync("./commands/").forEach(dir => {
  const commands = readdirSync(`./commands/${dir}/`).filter(file =>
    file.endsWith(".js")
  );
  for (let file of commands) {
    let command = require(`./commands/${dir}/${file}`);
    console.log(`${command.name} Has Been Loaded - ✅`);
    if (command.name) client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    }
  }
});
/*====================================================================*/
//<COMMANDS SNIPE>
client.snipe = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipe.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});
/*====================================================================*/
//<SETUP>
client.on("message", async message => {
  if (message.author.bot || !message.guild || message.webhookID) return;
  let Prefix = await db.get(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = Default_Prefix;
  if (!message.content.startsWith(Prefix)) return;
  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  /*====================================================================*/
  //<COMMAND NO VALID>
  if (!command)
    return message.channel
      .send(
        `<a:failed:798526823976796161> No Command Found - ${cmd
          .charAt(0)
          .toUpperCase() + cmd.slice(1)}`
      )
      .then(m => m.delete({ timeout: 500 }).catch(e => {}));
  /*====================================================================*/
  //<COMMAND USAGE AND DESCRIPTION>
  /*only extra:
  module.exports = {
  name: "name cmd",
  aliases: [],
  category: "category",
  description: "description cmd",
  usage: "usage cmd",
  args: true/false,
  */
  if (command.args && !args.length) {
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `You didn't provide any arguments, ${
            message.author
          }!\nThe proper usage would be:\n\`\`\`html\n${command.description ||
            "No Description"}\`\`\`Usage:\n\`\`\`html\n${command.usage ||
            "No Usage"}\n\`\`\``
        )
    );
  }
  /*====================================================================*/
  //<COMMAND NO RESPON DM>
  /*only extra:
  module.exports = {
  name: "name cmd",
  aliases: [],
  category: "category",
  description: "description cmd",
  usage: "usage cmd",
  guildOnly: true/false,
  */
  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("I can't execute that command inside DMs!");
  }
  /*====================================================================*/
  //<COMMAND for Owner>
  /*only extra:
  module.exports = {
  name: "name cmd",
  aliases: [],
  category: "category",
  description: "description cmd",
  usage: "usage cmd",
  owner: true/false,
  */
  if (command.owner && message.author.id != `${message.guild.ownerID}`) {
    const owmer = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        `${client.emotes.error} These commands can only be used by owner`
      );

    return message.channel
      .send(owmer)
      .then(m => m.delete({ timeout: 20000 }).catch(e => {}));
  }
  /*====================================================================*/
  /*only extra:
  module.exports = {
  name: "name cmd",
  aliases: [],
  category: "category",
  description: "description cmd",
  usage: "usage cmd",
  permissions: "Name permissions",
  
 <⬇️====⬇️ Permission>
  'CREATE_INSTANT_INVITE'|
  'KICK_MEMBERS'
 |'BAN_MEMBERS'|
'ADMINISTRATOR'|
'MANAGE_CHANNELS'
|'MANAGE_GUILD'|
'ADD_REACTIONS'|
'VIEW_AUDIT_LOG'
|'PRIORITY_SPEAKER'|
'STREAM'
|'VIEW_CHANNEL'
|'SEND_MESSAGES
'|'SEND_TTS_MESSAGES'|
'MANAGE_MESSAGES'
|'EMBED_LINKS'
|'ATTACH_FILES'
|'READ_MESSAGE_HISTORY
'|'MENTION_EVERYONE'
|'USE_EXTERNAL_EMOJIS'|
'VIEW_GUILD_INSIGHTS'|
'CONNECT'|'
SPEAK'
|'MUTE_MEMBERS
'|'DEAFEN_MEMBERS'
|'MOVE_MEMBERS'
|'USE_VAD'
|'CHANGE_NICKNAME'|
'MANAGE_NICKNAMES'|
'MANAGE_ROLES'|'
MANAGE_WEBHOOKS'|'
MANAGE_EMOJIS'*/
  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `You do not have permission to use this command.\nThis command requires \`${command.permissions}\``
          )
      );
    }
  }
  /*====================================================================*/
  //<COMMAND COOLDOWN>
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `<a:failed:798526823976796161> Please wait **${ms(
              timeLeft
            )}** before reusing the command again.`
          )
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  try {
    if (command) {
      command.run(client, message, args);
    }
    //<COMMAND SEND ERROR>
  } catch (error) {
    const errrr = new MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setDescription(
        `Something went wrong executing that command\nError Message: \`${
          error.message ? error.message : error
        }\``
      );
    return message.channel
      .send(errrr)
      .then(m => m.delete({ timeout: 13000 }).catch(e => {}));

    client.logger.error(error);
  }
  /*====================================================================*/
  //<COMMAND EP/LEVEL>
  return addexp(message);
});

/*====================================================================*/
client.on("guildMemberAdd", async member => {
 /*const canva = require("canvas-constructor");
  const path = require("path");
  const snekfetch = require("snekfetch");
  const fs = require("fs");
  const superagent = require("superagent");
                       
const image = new Canvas.Welcome()
  .setUsername("xixi52")
  .setDiscriminator("0001")
  .setMemberCount("140")
  .setGuildName("Server DEV")
  .setAvatar("https://cdn.discordapp.com/attachments/807204846850539520/809408353771454544/SPOILER_20201228_090307.jpg")
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://cdn.discordapp.com/attachments/807204846850539520/809408353771454544/SPOILER_20201228_090307.jpg")
  .toAttachment();
  */
  const Canvas = require("canvas");
 if(!member.guild) return;
      //create a new Canvas
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(`https://cdn.glitch.com/02e867ae-7c7c-4637-ace7-66ea251fe9d5%2Fthumbnails%2Fwelcome.png?1613195262594`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
  let chx = db.get(`welchannel_${member.guild.id}`);
  let ch = db
    .get(`message_${member.guild.id}`)
    .replace(`{user}`,member)// Member mention substitution
    .replace(`{member}`, member) // Member mention substitution
    .replace(`{username}`, member.user.username) // Username substitution
    .replace(`{tag}`, member.user.tag) // Tag substitution
    .replace(`{image}`, "attachment://Welcome.png").attachFiles(attachment)

		
    .replace(`{server}`, member.guild.name) // Name Server substitution
    .replace(`{size}`, member.guild.members.cache.size);
  if (chx === null) {
    return;
  }
  const json = JSON.parse(ch);
  const sender = await client.channels.cache.get(chx);
  sender.send({
    embed: json
  });
});
/*====================================================================*/

/*====================================================================*/
client
  .login(Token)
  .catch(() =>
    console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
  );
