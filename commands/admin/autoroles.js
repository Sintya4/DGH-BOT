const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "crole",
  description: "Creates A new role in the guild",
  category: "admin",
  args: true,
  permissions:"MANAGE_ROLES" || "ADMINISTRATOR",
  usage: "crole <RANDOM>",
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
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.guild.roles.create({
      data: {
        name: name,
        color: toHex(args[0])
      }
    });
    message.channel.send("managed to make random Roles");
  }
};
