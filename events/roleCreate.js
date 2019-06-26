const Discord = require('discord.js');

module.exports = async (client, role) => {

	const embed = new Discord.RichEmbed()
		.setTitle("New Role")
		.addField("Name", role, true)
		.addField("ID", role.id, true)
		.setTimestamp(Date.now());
};