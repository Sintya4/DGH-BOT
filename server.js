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
/*====================================================================*/
const { addexp } = require("./level-xp/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const cooldowns = new Discord.Collection();
client.queue = new Map();
/*====================================================================*/
client.config = require("./config/bot");
client.emotes = client.config.emojis;
const welcome = require("./Guild/welcome");
welcome(client);
const Leave = require("./Guild/leave");
Leave(client);/*
const log = require("./Guild/Log");
log(client);*/
/*====================================================================*/
//<ACTIVITY>
client.on("ready", async () => {
  console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
  client.user.setActivity(
    `Commands: ${Default_Prefix}help\n ${client.guilds.cache.size} Server | ${client.users.cache.size} User`,
    { type: "WATCHING" }
  );
});
/*====================================================================*/
const { readdirSync } = require("fs");
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
/*setInterval(function() {
  let database = JSON.parse(fs.readFileSync("./link.json", "utf8"))})
*//*====================================================================*/
//<COMMANDS SNIPE>
client.snipe = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipe.set(message.channel.id, {
    content: message.content,
    content: message.embed,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});
/*====================================================================*/
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./Manager.json",
  updateCountdownEvery: 3000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
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
      .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
  /*====================================================================*/
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
          }!\nThe proper usage would be: \n\`\`\`html\n${
            command.usage
          }\n\`\`\`Description:\`\`\`html\n${command.description ||
            "No Description"}\n\`\`\``
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
        "<a:failed:798526823976796161>These commands can only be used by owner"
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
  
 /*
  client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
 
  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)

  let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5

  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
    
  let levelembed = new Discord.MessageEmbed()
  .setDescription(`${message.author}, You have leveled up to level ${levelfetch}`)
   message.channel.send(levelembed)
  }
  
 

}) 
 */ 
});
/*====================================================================*/
client.on("message", async message => {
  let Prefi = await db.get(`Prefix_${message.guild.id}`);
  if (!Prefi) Prefi = Default_Prefix;
  if (message.content === `<@${client.user.id}>`) {
    message.channel
      .send(`My Prefix Is \`${Prefi}\``)
      .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    message.delete();
  }
});
client.on("message", async message => {
   
  
  const P = `%`
        let args = message.content
    .slice(P.length)
    .trim()
    .split(/ +/g);

 const customer = {
    name: "Newbie Co.",
    order_count: 0,
    address: "Po Box City",
}
const jsonString = JSON.stringify(customer)
fs.writeFile('./link.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
}) 
});
/*====================================================================*/
client
  .login(Token)
  .catch(() =>
    console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
  );
