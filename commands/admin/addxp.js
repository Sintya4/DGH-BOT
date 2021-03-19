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
      const toadd = args.slice(1).join(" ")
      const member = args[0]
  if(isNaN(member)) 
    return message.channel.send("pls give id user")
      
     
    await db.add(`xp_${message.author.id}_${message.guild.id}`, toadd)
 return message.channel.send("managed to add XP level with "+ `<@${member}>`+ "as much" +toadd)
}}