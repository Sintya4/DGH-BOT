const fs = require("fs");
//const { readdirSync } = require("fs");

module.exports = {
  name: "code",
  description: "Display the code of the specified command.",
  usage: "code <Category></><cmd>",
  category: "admin",
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  args: true,
  run: (client, message, args, mass) => {
    message.delete();
    let code;
const { readdirSync } = require("fs");

readdirSync("./commands/").forEach(dir => {

  const commands = readdirSync(`./commands/${dir}/`).filter(file =>

    file.endsWith(".js")

  );

    try {
      code = fs.readFileSync(`commands/${args[0]}.js`).toString();
    } catch (error) {
      return message.channel.send(
        `I couldn't find a command called \`${args[0]}\``
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
