const Discord = require("discord.js");
const fs = require("fs");
//const db = require("wio.db");
const { Client } = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const client = new Client({
  disableEveryone: true
});
//const client = new Discord.Client();
const {
  Default_Prefix,
  Token,
  Support,
  Color,
  Dashboard
} = require("./config.js");
const { addexp } = require("./handlers/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
client.on("ready", async () => {
  console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);

  client.user.setActivity(
    `Commands: ${Default_Prefix}help\n ${client.guilds.cache.size} Server | ${client.users.cache.size} User

   `,
    { type: "WATCHING" }
  );
});
const { readdirSync } = require("fs");
let modules = ["./commands/../"];
readdirSync("./commands/").forEach(dir => {
  const commands = readdirSync(`./commands/${dir}/`).filter(file =>
    file.endsWith(".js")
  );
  // throw new Error(`A File Does Not End With .js!`);
  for (let file of commands) {
    let command = require(`./commands/${dir}/${file}`);
    console.log(`${command.name} Has Been Loaded - ✅`);
    if (command.name) client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    }
  }
});
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

//<SETUP>
client.on("message", async message => {
  if (message.author.bot || !message.guild || message.webhookID) return;

  let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
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
  //<COMMAND NO VALID>
  if (!command)
    return message.channel.send(
      `No Command Found - ${cmd.charAt(0).toUpperCase() + cmd.slice(1)}`
    );
  //<COMMAND USAGE>
  if (command.args && !args.length) {
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `You didn't provide any arguments, ${message.author}!\nThe proper usage would be: \n\`\`\`html\n${command.usage}\n\`\`\``
        )
    );
  }
  //<COMMAND NO RESPON DM>
  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("I can't execute that command inside DMs!");
  }
  //<COMMAND for Owner>
  if (command.owner && message.author.id != `${message.guild.ownerID}`) {
    return message.reply("I can't execute that command inside DMs!");
  }
  //<COMMAND COOLDOWN>
  const now = Date.now();
  if (db.has(`cd_${message.author.id}`)) {
    const expirationTime = db.get(`cd_${message.author.id}`) + 3000;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `<a:failed:798526823976796161> Please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${Default_Prefix}${cmd}\` command.`
      );
    }
  }
  db.set(`cd_${message.author.id}`, now);
  setTimeout(() => {
    db.delete(`cd_${message.author.id}`);
  }, 3000);
  try {
    if (command) {
      command.run(client, message, args);
    }
    //<COMMAND SEND ERROR>
  } catch (e) {
    const errrr = new MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setDescription(
        `Something went wrong executing that command\nError Message: \`${
          e.message ? e.message : e
        }\``
      );
    return message.channel
      .send(errrr)
      .then(m => m.delete({ timeout: 8000 }).catch(e => {}));

    client.logger.error(e);
  }
  //<COMMAND EP/LEVEL>
  return addexp(message);
  });
client
  .login(Token)
  .catch(() =>
    console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
  );
