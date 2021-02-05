const db = require("quick.db");
const MessageEmbed = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "sayc",
  category: "misc",
  description: "sayc channel send :/",
  usage: "sayc [#Channel] [...Text]\nsayc -json [#Channel] [...Text]",
  args: true,
  run: async (client, message, args, del, member) => {
    message.delete();
    let channel = message.mentions.channels.first();
    let chnnel = message.guild.channels.cache.find(
      x => x.id === db.get(`say_${message.guild.id}`, channel.id)
    );

    let chnne = message.guild.channels.cache.find(
      x => x.id === db.get(`say_${message.guild.id}`, channel.id)
    );

    const [key, ...value] = args;
    switch (key) {
      case "-json": {
        await db.set(`say_${message.guild.id}`, channel.id);
        const embed = new Discord.MessageEmbed().setColor("GREEN").setDescription(
          args.slice(2).join(" ")
        );

        return chnnel.send(embed);
      }
    }
    const arg = args[0];
    if (!arg) {
      return message.channel
        .send("<a:failed:798526823976796161> Please Mention the channel first")
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    }
    const usa = args[0];
    if (!usa)
      return message.channel
        .send(`${message.author}, sayc <channel> <msg>`)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    let say = args.slice(1).join(" ");
    await db.set(`say_${message.guild.id}`, channel.id);

    //  const Channel = member.guild.channels.cache.get("797491226567114753"); //insert channel id that you want to send to
    chnnel.send(say);
  }
};
