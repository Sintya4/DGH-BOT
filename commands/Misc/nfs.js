const { get } = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "nfs",
  aliases: ["ms"],
  category: "info",
  description: "Show Bot Ping!",
  usage: "Ping",
  run: async (client, message, args) =>  {
		get('https://nekobot.xyz/api/image')
			.query({ type: 'pgif' })
			.end((err, response) => {
				const embed = new MessageEmbed()
					.setImage(response.body.message);
				message.channel.send(embed);
			});
	}}