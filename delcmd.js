const db = require("quick.db");

module.exports = {
  name: "delcmd",
  usage: "delcmd <Badword>",
  description: "Delete the custom Badword",
  category: "admin",
  permissions: "MANAGE_GUILD",
  run: (client, message, args) => {
    message.delete();
    let cmdname = args[0];
    let database = db.get(`cmd_${message.guild.id}`);
    if (database) {
      let data = database.find(x => x.name === cmdname.toLowerCase());
      if (!data)
        return message.channel.send(":x: Unable to find this Badword.");
      let value = database.indexOf(data);
      delete database[value];
      var filter = database.filter(x => {
        return x != null && x != "";
      });
      db.set(`cmd_${message.guild.id}`, filter);
      return message.channel.send(`Deleted the **${cmdname}** Command!`);
    } else {
      return message.channel.send(
        ":x: Sorry but i am unable to find that Badword!"
      );
    }
  }
};
