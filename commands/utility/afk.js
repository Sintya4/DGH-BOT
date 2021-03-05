const db = require("quick.db")
module.exports = {
        name: "afk",
        usage: `afk <reason>`,
        category: "category",
        description: "are you afk",
        args: false,
        cooldown: 1,
        permission: "",
    run: async (client, message, args) => {
//code
 // thejk33kj3n here you use the database :
db.set(message.author.id + '.afk','true')
db.set(message.author.id + '.messageafk', message.content.split(' ').slice(0))
           message.channel.send('Aight, I have set your AFK. I will send a message to the users who mention you..')
/*    if (message.content.includes('off')) {
db.delete(message.author.id + '.afk')
db.delete(message.author.id + '.messageafk')
    }*/
  
}}