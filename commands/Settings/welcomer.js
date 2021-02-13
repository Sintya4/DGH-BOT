const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "welcomer",
  category: "setting",
  args: true,
  usage:
    "welcomer channel <ChannelMention>\nwelcomer message <...Message/JSON>`^(Must include ({member},{username},{tag},{server},{size}) for this to work!)^`\nwelcomer testmessage\nwelcomer textmessage\nwelcomer -jsonmessage",
  description: "Set the welcome",
  run: (client, message, args) => {
    const channel = message.mentions.channels.first();
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );
      case "channel":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`welchannel_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone joins the server`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }
        break;
      case "message":
        {
          const msg = args.slice(1).join(" ");
          if (!msg) {
            return message.channel
              .send(
                `${client.emotes.error}\`Please give a message to welcomer ^(Must include ({member},{username},{tag},{server},{size}) for this to work!)^\``
              )
              .then(m => m.delete({ timeout: 8000 }).catch(e => {}));
          }
          db.set(`message_${message.guild.id}`, msg);
          const messag = new Discord.MessageEmbed()
            .setDescription(`**Done** From now on I will send\n\`${msg}\``)
            .setColor("RED");
          message.channel.send(messag);
        }
        break;
      case "textmessage":
        {
          let text = db.get(`message_${message.guild.id}`);
          const em = new Discord.MessageEmbed()
            .setTitle(
              `
    **Text Message welcome**
    \`\`\`\n${text || "please setup welcomer message first "}\n\`\`\`
    `
            )
            .setColor("RED");
          message.channel.send(em);
        }
        break;
      case "-jsonmessage":
        {
          const jso = new Discord.MessageEmbed()
            .setTitle(`**Json Message**`)
            .setDescription(
              `\`\`\`\n{"title": "My title","color":"Name color","description": "My description"}\n\`\`\`\n\`\`\`\n{"author": {"name": "My author name", "icon_url": "url here"}, "description": "My description"}\n\`\`\`\n\`\`\`\n{"fields": [{"name": "My field name", "value": "My field value"}, {"name": "My field name", "value": "My field value", "inline": false}]}\n\`\`\``
            )
            .setColor("RED");
          message.channel.send(jso);
        }
        break;
      case "testmessage": {
        const test = new Discord.MessageEmbed()
          .setTitle(`**Testing Member Join**`)
          .setColor("RED");
        message.channel.send(test);
        let chx = db.get(`welchannel_${message.guild.id}`);
        let ms = db
          .get(`message_${message.guild.id}`)
          .replace(`{member}`, message.author) // Member mention substitution
          .replace(`{user}`, message.author) // Member mention substitution
          .replace(`{username}`, message.author.username) // Username substitution
          .replace(`{tag}`, message.author.tag) // Tag substitution
          .replace(`{server}`, message.guild.name) // Name Server substitution
          .replace(`{size}`, message.guild.members.cache.size);

        if (ms === null) {
         return message.channel.send(
           "Sorry No Welcomer Message on this server"
         )
        }
        const json = JSON.parse(ms);
        const sender = client.channels.cache.get(chx);
        sender.send({
          embed: json
        });
      }
    }
  }
};

/* 
  Now we gonna use quick.db*/
