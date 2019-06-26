const Discord = require('discord.js');

module.exports = async (client, oldGuild, newGuild) => {

	// Declare our values
	const oldName = oldGuild.name;
	const oldPFP = oldGuild.iconURL;

	const newName = newGuild.name;
	const newPFP = newGuild.iconURL;

	// Create our embed
	embed = new Discord.RichEmbed()
		.setTitle("Guild Updated")
		.addField("Old Guild Name", oldName, true)
		.addField("New Guild Name", newName, true)
		.setThumbnail(newPFP)
		.setImage(oldPFP)
		.setColor()
		.setTimestamp(Date.now());

	// TODO add database and send message
};