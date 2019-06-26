const Discord = require('discord.js');

module.exports = async (client, oldRole, newRole) => {

	// Get guild variable
	const guild = newRole.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Role Updated**')
		.addField('Role', `<@&${newRole.id}>\n\`${newRole.id}\``)
		.addField('Before', `@${oldRole.name}`, true)
		.addField('After', `@${newRole.name}`, true)
		.addField('Updated by', `\`\`${entry.executor.tag}\`\`\n\`${entry.executor.id}\``)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('orange'));

	// If a reason was given, add it as description
	if (entry.reason) await embed.setDescription(`**Reason:** ${entry.reason}`);

	// Send embed
	return client.channels.get('592845625209389069').send(embed);

};