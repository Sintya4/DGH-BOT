const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel> <message>",
  args: true,
  owner: true,
  description: "Set the welcome channel",
  run: (client, message, args) => {
    let channel = message.mentions.channels.first();
  
    const [key, ...value] = args;
        switch (key) {
            case 'setup': {
            message.channel.send('Interactive Welcomer setup...');

const response1 = message.reply(message, `Enter Channel name:\nEg: \`#channel\`\n\nType \`cancel\` to exit this setup.`, 20000, true);
            if (!response1) return message.channel.send(`No response... Exiting setup...`);
            if (response1.content === 'cancel') return message.channel.send(`Exiting setup...`);
            const channel = response1.mentions.channels.first();
            if (!channel || channel.type !== 'text') return message.channel.send(`Invalid channel... Exiting setup...Try again...`);
            if (!channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return message.channel.send('Unicron doesn\'t have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup');

            const response2 = message.reply(message, `Ok, now Enter Welcome message (Must include \`{user}\` placeholer)\nEg: \`Welcome {user} to this awesome server!\`\n\nType \`cancel\` to exit this setup`, 40000, true);
            if (!response2) return message.channel.send(`No response... Exiting setup...`);
            if (response2 === 'cancel') return message.channel.send(`Exiting setup...`);
            if (!response2.content.includes('{user}')) return message.channel.send(`Missing placeholer \`{user}\`... Exiting setup...Try again...`);
}}}}
    
    
    
    
    
    
    
    /*
    //Now we gonna use quick.db
    let say = args.slice(1).join(" ");
 if(!say) {
   return message.channel.send("please give a message that will be conveyed")
   }

    db.set(`welchannel_${message.guild.id}`, channel.id);

  message.channel
      .send(`Welcome Channel is seted as ${channel}`)
      .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
  }
};*/
