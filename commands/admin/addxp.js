const db = require ("quick.db")

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
      const toadd = args
         db.add(`xp_${message.author.id}_${message.guild.id}`, toadd)
 
}}