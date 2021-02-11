const { MessageEmbed } = require("discord.js");

const math = require("mathjs");

const Color = `RANDOM`;

module.exports = {
  name: "math",

  category: "misc",
  usage: "math 1+1",
  args: true,
  run: async (client, message, args) => {
    message.delete();

    try {
      if (!args[0]) return message.channel.send("Please Give Me Equation!");

      const embed = new MessageEmbed()

        .setColor(`${Color}`)

        .setTitle(`Result`)

        .setDescription(math.evaluate(args.join(" ")))

        .setTimestamp();

      message.channel.send(embed).then(m => {
        m.react("798526789114134548");

        m.react("798526823976796161");
     }) 
      
         const filter = (reaction, user) => {
            return (
                ["798526823976796161", "798526789114134548"].includes(reaction.emoji.name) &&
                user.id === message.author.id
            );
        };

        m.awaitReactions(filter, { max: 1, time: 300000, errors: ["time"] }).then(collected => {
        const reaction = collected.array()[collected.size - 1]

            if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

        if (reaction.emoji.name === "798526823976796161") {
          m.delete();
        }
      })});
 
    } catch (error) {
      message.channel
        .send(`Please Give Me Valid Equation | Try Again Later!`)
        .then(() => console.log(error));

      return message.reply(`Cannot send because there is no Msg set`);
    }
  }
};