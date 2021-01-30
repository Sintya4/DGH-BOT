const fs = require("fs");
const { readdirSync } = require("fs");

module.exports = {
  name: "code",
  description: "Display the code of the specified command.",
  usage: "code <cmd>",
  category: "info",
  args: true,
  run: (client, message, args, mass) => {
    message.delete();
    let code;
    try {
     // code = fs.readFileSync(`commands/${args[0]}.js`).toString();
    readdirSync("./commands/").forEach(dir => {

  code = fs.readFileSync(`./commands/${dir}/${args[0]}.js`).toString()
  })
    } catch (error) {
      return message.channel.send(
        `I couldn't find a command called \`${args[0] || "Invalid cmd"}\`
        How to use Yes it is category/cmd
`
      );
    }

    try {
      if (args[0]) {
        const options = {
          method: "POST",

          body: code,

          headers: {
            "Content-Type": "application/json"
          }
        };

        message.channel.send(
          `Here is the code for the \`${args[0]}\` command:

\`\`\`js

${code.substr(0, 992883)}\`\`\``
        );
      }
    } catch (e) {
      return message.channel.send(
        "There was an error displaying the command's code."
      );
    }
  }
};
