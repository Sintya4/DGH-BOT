const db = require("quick.db");


module.exports = {

  name: "react",

  category: "Misc",

  description: "Get bot ping :/",

  usage: "react <emoji>",
  args: true,

  run: async (client, message, args, del, member) => {
   message.delete();
    const id = args[0]
  const emoji = client.emojis.get(`${id}`);
        message.react(emoji)
   }}