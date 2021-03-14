const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "randomroles",
  description: "Creates A new role in the guild",
  category: "admi",
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  usage: "crole",
  cooldown: 1,
  run: async (client, message, args) => {
    var remainingTime = args.join(" ") || 50;
    // generate random hex color
    if (!message.member.colorRole) {
      // if user doesn't have a color role
      setInterval(() => {
        remainingTime--;
         var finalA =
      "#" +
      (
        "000000" +
        Math.random()
          .toString(16)
          .slice(2, 8)
          .toUpperCase()
      ).slice(-6);
        var roleName = "#" + finalA; // set a name variable for the new role as #<username>
        message.guild.roles.create(
          {
            data: {
              name: roleName, // set rolename as the name variable
              color: finalA, // set color to the random generated one
              hoist: false, // set role to be not hoistable
              permissions: 1177930945, // copied from genprog guild
              mentionable: false // set role unmentionable
            }
          },
          1500
        );
      });
    }
  }
};
