const Discord = require('discord.js')
const { MessageEmbed } = Discord
//const webhookconfig = require('../../webhook.json')
const webhook = `brhrbrh`
const webhookid = webhook.ID
const webhooktoken = webhook.TOKEN
const webhookurl = webhook.URL
const id = webhookid
const token = webhooktoken
const url = webhookurl
const web = require('discord.js')
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(webhookurl);

module.exports = {
  name: "suggest",
  category: "bot",
  description: "SUGGEST A COMMAND",
  useage: "suggest <COMMAND>",
  //<title of suggestion> (if you want more info about this command do +suggestion help)
  run: async (client, message, args) => {
    message.delete()
    let Member = message.author
 
hook.setUsername(`${Member.username}`);
hook.setAvatar(`${Member.displayAvatarURL({ dynamic: true })}`);
 
hook.send(args[0]);
    //this is for an embed suggestion webhook
  /* const Suggestion = new MessageEmbed()
    .setTitle(args[0])
    .setAuthor(Member.username)
    .setThumbnail(Member.displayAvatarURL({ dynamic: true }))
    .addField(`
}
}
`)
    hook.send(Suggestion)
   */
    }
  }