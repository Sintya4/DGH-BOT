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
      const user = message.mentions.users.first(args[1]) || message.author;

    if (user.id === client.user.id) {
      //IF BOT
      return message.channel.send(":wink: | I am on level ∞");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

      const toadd = args[0]
      if(!toadd) return message.channel.send("Please give any XP")
      if(isNaN(toadd)) return message.channel.send("sorry this is not a number but a letter")
      
     
       //  db.add(`xp_${user.id}_${message.guild.id}`, toadd);
 message.channel.send(`${client.emotes.     Successfully added XP by ${user} as much ${toadd}`)
}}