const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "removerole",
  description: "Removes role in the guild",
  category: "admin",
  args: true,
  owner: true,
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  usage: "removerole <Name/all>",
  run: async (client, message, args) => {
    const role = message.guild.roles.cache.find(r => r.name === args.join(" "));
  /* const role2 = message.guild.roles.cache.find()
    const [key, ...value] = args;
    switch (key) {
      case "all": {
        message.guild.roles.delete(role2);
        return message.channel.send("successfully remove roles all");
      }
    }
    await message.guild.roles.delete(role);
    return message.channel.send("successfully remove roles");
  }
};
