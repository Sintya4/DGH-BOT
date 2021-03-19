const db = require("quick.db");

module.exports = {
  name: "addxp",
  usage: `addxp <number>`,
  category: "admin",
  description: "add XP level",
  args: true,
  cooldown: 0,
  permission: "",
  owner: true,
  run: async (client, message, args) => {
    //code
    const toadd = args[0]//(" ");
  
    await db.add(`xp_${message.author.id}_${message.guild.id}`, toadd);
    return message.channel.send(
      "managed to add XP level with " + "as much" + toadd
    );
  }
};
