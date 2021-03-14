const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "randomroles",
  description: "Creates A new role in the guild",
  category: "admi",
  args: true,
  permissions:"MANAGE_ROLES" || "ADMINISTRATOR",
  usage: "crole",
  run: async (client, message, args) => {
/*   const name = args.slice(1).join(" ");
    const regex = !/[^a-zA-Z0-9]+/g.test(name);
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You don't have enough Permissions");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I don't have enough permissions to do this");
    }
    if (!name) {
      return message.channel.send("You need to specify a name for your Role");
    }
    if (regex === false) {
      return message.channel.send(
        "That is not valid role name. It can contain only letters and numbers"
      );
    }
    if (name.length > 100) {
      return message.channel.send(
        "Your role can't be more than 100 characters long"
      );
    }*/
    message.guild.roles.create({
      data: {
        name: "RED",
        color: "#AC1717",
      }
    });
        message.guild.roles.create({
      data: {
        name: "BLUE",
        color: "#B9B9BE",
      }
    });
    message.guild.roles.create({
      data: {
        name: "YELLOW",
        color: "#BEBEB9",
      }
    });
    message.guild.roles.create({
      data: {
        name: "GREEN",
        color: "#B9BEB9",
      }
    });
    message.guild.roles.create({
      data: {
        name: "BLACK",
        color: "#1e1e1e",
      }
    });
    message.guild.roles.create({
      data: {
        name: "ORANGE",
        color: "#f7ad67",
      }
    });
    message.guild.roles.create({
      data: {
        name: "BERTA BLUE",
        color: "#4dd4f9",
      }
    });
    message.guild.roles.create({
      data: {
        name: "PINK",
        color: "#fc6c9e",
      }
    });

    message.channel.send("managed to make random Roles");
  }
};
