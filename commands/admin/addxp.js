const db = require ("quick.db")
module.exports = {
        name: "name",
        usage: `usage`,
        category: "category",
        description: "",
        args: false,
        cooldown: 0,
        permission: "",
    run: async (client, message, args) => {
//code
      const toadd = args[0]
         db.add(`xp_${message.author.id}_${message.guild.id}`, toadd);
 message.channel.send("ok")
}}