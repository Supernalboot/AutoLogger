const Discord = require('discord.js');

module.exports = async (client, role) => {

	// Get guild variable
	const guild = role.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Role Deleted**')
		.addField('Role', `@${role.name}\n\`${role.id}\``, true)
		.addField('Deleted by', `\`\`${entry.executor.tag}\`\`\n\`${entry.executor.id}\``, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));

	// If a reason was given, add it as description
	if (entry.reason) await embed.setDescription(`**Reason:** ${entry.reason}`);

	// Send embed
	return client.channels.get('592845625209389069').send(embed);

};