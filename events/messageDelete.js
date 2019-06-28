const Discord = require('discord.js');

module.exports = async (client, message) => {

	// Get guild variable
	const guild = message.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Return any bots changing messages to reduce spam
	if (entry.executor.bot) return;

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Message Deleted**')
		.addField(`**${message.author.tag}**`, `\`\`\`${message.content}\`\`\``, true)
		.addField('Deleted by', `\`\`${entry.executor.tag}\`\`\n\`${entry.executor.id}\``, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));

	// Send embed
	return client.channels.get('592845625209389069').send(embed);

};