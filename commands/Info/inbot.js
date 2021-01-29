const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const gagal = `RED`;
const gg = (module.exports = {
  name: "inbot",
  category: "search",
  description: "Get bot link invite",
  usage: "inbot",
  run: async (client, message, args, msss) => {
    message.delete();
    //  let annel = message.guild.channels.cache.find((x) => (x.name === ``))
    const db = require("quick.db");
    const msgg = args[0];
  let chnnel = message.guild.channels.cache.find(x => x.id === db.get(`inbot_${message.guild.id}`) );
//if (!chnnel, message.channel.id) return; //db.get(`inbot_${message.guild.id}`)) return; 
// message.channel.send(Check Channel ${channel})//
    if (!msgg)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription("<a:failed:798526823976796161> Please Give ID Bot")
          .setColor(gagal)
          .setTimestamp()
      );
    const mss = args[1];
    if (!mss)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription(
            "<a:failed:798526823976796161> Please Give Prefix Bot"
          )
          .setColor(gagal)
          .setTimestamp()
      );
    if (!msgg)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription("<a:failed:798526823976796161> Please Give ID Bot")
          .setColor(gagal)
          .setTimestamp()
      );
    if (msgg.length > 18)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription(
            "<a:failed:798526823976796161> Too Long ID - 18 Limit"
          )
          .setColor(gagal)
          .setTimestamp()
      );
    if (msgg.length < 17)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription(
            "<a:failed:798526823976796161> Less Bot ID!, must be 18 ID"
          )
          .setColor(gagal)
          .setTimestamp()
      );
    if (isNaN(msgg))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription("<a:failed:798526823976796161> This is not an ID")
          .setColor(gagal)
          .setTimestamp()
      );
    //  const { MessageEmbed } = require ("discord.js")
    //await message.channel.send("Check Channel")
    const me = message.author.tag;
  //  const us = await message.guild.members.fetch(args[0])
 //   const nick = message.members.first()
// const bot = message.bot.tag;
    //return message.channel.send("Check Channel")
   //\nBot Name: \n${us}  const { Discord, MessageEmbed } = require("discord.js");
    //await message.channel.send("Check Channel")
    const no = new MessageEmbed()
      .setTitle("BOT LINK ID")
      .setDescription(`Author: \`\`\`css\n${me}\n\`\`\``)
      .setColor("YELLOW")
      .addField("ID BOT", `\`\`\`\n${msgg}\n\`\`\``)
      .addField("PREFIX", `\`\`\`\n${mss}\n\`\`\``)
      .addField(
        "INVITE BOT",
        `[Clink Here](https://discord.com/oauth2/authorize?client_id=${msgg}&scope=bot&permissions=8)`
      );
   // await message.channel.send(
          const www = new MessageEmbed()
          .setTitle("Discord Developer")
          .setDescription(`Check Channel ${chnnel ||
        `<a:failed:798526823976796161> Failed to Send`}`)
       .setColor(gagal)
          .setTimestamp()
          message.channel.send(www).then(m=>m.delete({timeout:12000}).catch(e=>{}))
      
    
     chnnel.send(no).then(m => {
      m.react("✅");

      m.react("❌");
       
       client.on("messageReactionAdd", async (reaction, user) => {

  if (user.bot) return; // If the user was a bot, return.

 if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

      if (reaction.emoji.name === "❌"){

           message.channel.bulkDelete(1);

    }}) 

 
 }) 

   
// if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.

//  if (reaction.partial) await reaction.fetch();

  

 
    //  await reaction.message.guild.members.cache.get(user.id).roles.add("708554596817174559") // Minecraft role.

    }
  }) 
  
 