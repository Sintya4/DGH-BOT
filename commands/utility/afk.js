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
        message.member.setNickname(`${message.author.username} [AFK]`).catch(error => message.channel.send("Couldn't update your nickname."));
        // then here you use the database :
        db.set(message.author.id + '.afk', 'true')
        db.set(message.author.id + '.messageafk', message.content.split(' ').slice(2))

        // I made .slice(2) so that in the message array it also delete the command and the "start-afk"
    
   
}}