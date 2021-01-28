const discord = require("discord.js");
module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
  run: (client, message, args) => {
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        `**${message.author.username}**, Kamu Tidak Ada Permission **KICK_MEMBERS**`
      );
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        `**${message.author.username}**, Tidak bisa di jalankan commandnya karena tidak ada permission **KICK_MEMBERS**`
      );
    }

    let target = message.mentions.members.first();

    if (!target) {
      return message.channel.send(
        `**${message.author.username}**, **Tolong Berikan Nama User Untuk Di Kick**`
      );
    }

    if (target.id === message.author.id) {
      return message.channel.send(
        `**${message.author.username}**, Kamu Tidak bisa kick Diri mu sendiri :b`
      );
    }

    if (!args[1]) {
      return message.channel.send(
        `**${message.author.username}**, Tolong Berikan Reason`
      );
    }

    let embed = new discord.MessageEmbed()
      .setTitle("✅ Sukses ✅")
      .setDescription(`Kicked ${target} (${target.id})`)
      .setColor("RANDOM")
      .setFooter(`Kicked by ${message.author.username}`);

    message.channel.send(embed);

    target.kick(args[1]);
    /*   
  client.on("message", async message => {
if (message.content === ``) {
message.guild.members.cache.forEach(member => {
 member.send(`${target}, Kamu Di Kick Oleh ${message.author.username}`).catch(e => console.error(`Couldn't DM member ${member.user.tag}`));
  message.delete()
  })})*/
  }
};
;
