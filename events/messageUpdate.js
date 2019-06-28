const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {

	// Get guild variable
	const guild = oldMessage.guild;

	// Return any bots changing messages to reduce spam
	if (oldMessage.author.bot) return;

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Message Updated**')
		.addField('Update', `\`\`\`diff\n- ${oldMessage.content}\n+ ${newMessage.content}\`\`\``)
		.addField('Updated by', `\`\`${oldMessage.author.tag}\`\`\n\`${oldMessage.author.id}\``)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('orange'));

	// Send embed
	return client.channels.get('592845625209389069').send(embed);

};