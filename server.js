const {
  Client,
  Collection,
  discord,
  Discord,
  MessageEmbed
} = require("discord.js");
const { config } = require("dotenv");
const { prefix, token } = require("./config.json");
const { badwords } = require("./data.json");
const { ping } = require("./ping.json");
const client = new Client({
  disableEveryone: true
});
// Collections
//const { mes } = require("./message.js");
const Cleverbot = require("cleverbot-node");

const db = require("quick.db");
const fs = require("fs");
const { addexp } = require("./handlers/xp.js");
client.commands = new Collection();
client.aliases = new Collection();
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
// Run the command loader
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//Events "handler"

client.on("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity(
    `\nCommands: =help\n${client.guilds.cache.size} Server | ${client.users.cache.size} User \nMade By FC 么 Glitch Editz `,
    {
      type: "WATCHING"
    }
  );
  console.log(`Hi, ${client.user.username} is now online!`);
});

function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

//STOP

client.on("message", async message => {
  if (message.author.bot) return;
  const { MessageEmbed } = require("discord.js");

  //START
  if (!message.member.hasPermission("/ADMINISTRATOR")) {
    // if (!message.guild.me.hasPermission("SEND_MESSAGES"))
    if (is_url(message.content) === true) {
      message.delete();
      let embed1 = new MessageEmbed()
        .setTitle("🔒BLOCK LINK🔒")
        .setDescription(
          `\`\`\`\nYou can not send link here :/\n\`\`\`\nLink: ${message}\nAuthor: ${message.author}`
        )
        .setColor("RED");
      return message.channel
        .send(embed1)
        .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
      message.delete();
    }
  }
  let confirm = false;

  //NOW WE WILL USE FOR LOOP
  var i;

  for (i = 0; i < badwords.length; i++) {
    if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
      confirm = true;
  }
  if (confirm) {
    message.delete();
    let embed = new MessageEmbed()
      .setTitle(`__**⚠️Badword⚠️**__`)
      .setColor("RED")
      .setTimestamp()
      .setImage(
        "https://cdn.discordapp.com/attachments/790938885365563395/797652772698718228/bad-words-2.png"
      )

      .setDescription(
        `\`\`\`\nYou are not allowed to send badwords here.\n\`\`\`=> Badword: [ ${message} ] \n=> Author: ${message.author}`
      );
    return message.channel
      .send(embed)
      .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
  }
});

client.snipes = new Map();

client.on("messageDelete", function(message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,

    author: message.author.tag,

    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
}); //<SETUP SETTINGS>
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  if (message.channel.type === "dm")
    return message.channel.send("No respons CMD");
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let cmdx = db.get(`cmd_${message.guild.id}`);

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd);
    if (cmdy) message.channel.send(cmdy.responce);
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
    return addexp(message);
  }
});

//GONNA USE EVENT HERE

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  if (chx === null) {
    return;
  }
  let data = await canva.welcome(member, {
    link:
      "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg"
  });
  const attachment = new discord.MessageAttachment(data, "welcome-image.png");
  client.channels.cache
    .get(chx)
    .send("Welcome to our Server " + member.user.username, attachment);
});
client.on("message", async member => {
  let chx = db.get(`msss_${member.guild.id}`);
  if (chx === null) {
    return;
  }
});
//STOP
client.login(token);
