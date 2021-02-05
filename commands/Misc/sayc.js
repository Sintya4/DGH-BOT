const db = require("quick.db");
const MessageEmbed = require("discord.js");
module.exports = {
  name: "sayc",
  category: "misc",
  description: "sayc channel send :/",
  usage: "sayc <#channel> <msg>",
  args: true,
  run: async (client, message, args, del, member) => {
    message.delete();
    const [key, ...value] = args;
    switch (key) {
      case "-json": {
             const json = new MessageEmbed()
            .setDescription(args.slice(2).join(' '))
        return chnnel.send(json)
    }
}      
     let channel = message.mentions.channels.first();
    await db.set(`say_${message.guild.id}`, channel.id);

    let chnnel = message.guild.channels.cache.find(
      x => x.id === db.get(`say_${message.guild.id}`, channel.id)
    );

   
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
    //  const Channel = member.guild.channels.cache.get("797491226567114753"); //insert channel id that you want to send to
    chnnel.send(say);
  }
};
