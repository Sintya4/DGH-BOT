const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
module.exports = function(client) {
  const description = {
    name: "GuildAdd",
    filename: "addbot.js",
    version: "4.8"
  };
  //log that the module is loaded
  console.log(
    ` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`
  );
client.on('guildCreate', async guild => {
	if (client.blacklist.guild.includes(guild.id) || client.blacklist.user.includes(guild.ownerID)) {
		guild.leave();
		return;
	}
	if (guild.systemChannel && guild.systemChannel.permissionsFor(client.user).has('SEND_MESSAGES')) {
		try {
			const usage = client.registry.commands.get('help').usage();
			await guild.systemChannel.send(`Hi! I'm Xiao, use ${usage} to see my commands, yes?`);
		} catch {
			// Nothing!
		}
	}})}