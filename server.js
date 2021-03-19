const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  disableEveryone: true
});
const {
  Default_Prefix,
  Token,
  Support,
  id,
  Color,
  DateDat,
  Dashboard
} = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const cooldowns = new Discord.Collection();
client.queue = new Map();
client.config = require("../emoji/emojis");
client.emotes = client.config.emojis;

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
for (let file of fs.readdirSync("./events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./events/${file}`);
    fileContents(client);
    const description = {
      name: fileName,
      filename: file,
      version: `4.8`
    };
    console.log(
      `⬜️ Module: ${description.name} | Loaded version ${description.version} | form("${description.filename}")`
    );
  }
}

client
  .login(Token)
  .catch(() =>
    console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
  );
