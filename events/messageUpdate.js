const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {
	// Declare Our values
	const channel = oldMessage.channel;
	const author = oldMessage.author;

	const embed = new Discord.RichEmbed()
		.setTitle("Message Updated")
		.setThumbnail(author.avatarURL)
		.setDescription(`Channel Link [HERE](${newMessage.url})`)
		.addField("Channel", channel.name)
		.addField("Old Message", oldMessage)
		.addField("New Message", newMessage)
		.addField("Author", `${author.tag} \`(${author.id})\``)
		.setTimestamp(Date.now());

	// TODO add database and send message
};