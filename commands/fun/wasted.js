const Random = require ("srod-v12");
const Discord = require ("discord.js");
module.exports = {
        name: "wasted",
        usage: `wasted <@user>`,
        category: "fun",
        aliases: ["wtd"],
        description: "Return A wasted image",
        args: true,
        cooldown: 1,
        permission: "",
    run: async (client, message, args) => {
//code
    const member = message.mentions.first() || message.guild.members.cache.get(args[0]) || message.member
    const Data = await Random.Wasted({Image: member.user.displayAvatarURL({format : "png" }), Color: "RANDOM"})
    message.channel.send(Data)
          }}