const Discord = require('discord.js');

module.exports = async (client, message) => {
	// Declare Our values
	const channel = message.channel;
	const author = message.author;

	const embed = new Discord.RichEmbed()
		.setTitle('Message deleted')
		.setThumbnail(author.avatarURL)
		.addField("Channel", `${channel.name} \`(${channel.id})\``)
		.addField("Message", message)
		.addField("Author", `${author.tag} \`(${author.id})\``)
		.setTimestamp(Date.now());
	return;
	// TODO add database and send message
};