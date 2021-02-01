const db = require("quick.db");


module.exports = {

  name: "afk",
  category: "misc",
  description: "afk commands",
  usage: "afk",

  run: async (client, message, args, del, member) => {
   message.delete();
    let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = db.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason
        };

        client.afk.set(message.author.id, construct);
      afklist.setNickname(`[AFK] ${message.author.username}`)
        return message.reply(`you have been set to afk for reason: ${reason}`).then(msg => msg.delete(5000));
    }

}};
