const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "randomroles",
  description: "Creates A new role in the guild",
  category: "admi",
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  usage: "crole",
  run: async (client, message, args) => {
    var finalA =
      "#" +
      (
        "000000" +
        Math.random()
          .toString(16)
          .slice(2, 8)
          .toUpperCase()
      ).slice(-6); // generate random hex color
    if (!message.member.colorRole) {
      // if user doesn't have a color role
      var roleName = "#" + message.author.username; // set a name variable for the new role as #<username>
      message.guild.roles
        .create({
          data: {
            name: roleName, // set rolename as the name variable
            color: finalA, // set color to the random generated one
            hoist: false, // set role to be not hoistable
            permissions: 1177930945, // copied from genprog guild
            mentionable: false // set role unmentionable
          }
        })
    /*    .then(r => {
          // after role creation
          message.member.addRole(r).then(gm => {
            // add target member to the role
            message.channel
              .send(
                "Set color to http://garden.offbeatwit.ch/color/" +
                  finalA.replace("#", "")
              )
              .catch(e => {
                // send user the new color (thx offbeatwitch for the site) and on error,
                console.error("Err in command: " + e); // print error to the console
              });
          });
        })
        .catch(e => {
          // if an error happens in role addition
          console.error("Err in command: " + e); // print error to the console
        });
    } else {
      // if user has a color role
      message.member.colorRole
        .edit({
          // edit the color role
          color: finalA // set color to the random generated one
        })
        .then(r => {
          // after role editing
          message.channel
            .send(
              "Set color to http://garden.offbeatwit.ch/color/" +
                finalA.replace("#", "")
            )
            .catch(e => {
              // send user the new color (thx offbeatwitch for the site) and on error,
              console.error("Err in command: " + e); // print error to the console
            });
        })
        .catch(e => {
          // if an error happens in role editing
          console.error("Err in command: " + e); // print error to the console
        });
    }
    if (
      message.channel
        .permissionsFor(message.guild.member(client.user))
        .has("MANAGE_MESSAGES") &&
      message.mentions.users.size > -1
    ) {
      // if bot has MANAGE_MESSAGES permission
      message.delete().catch(e => {
        // delete the incoming message and on error,
        console.log(
          "I don't have permissions to delete messages on Guild: " +
            message.guild.name +
            " Guild ID: " +
            message.guild.id
        ); // print error to the console
      });
    }*/
  }}
};
