const Discord = require('discord.js');

module.exports = async (client, role) => {

	// Get guild variable
	const guild = role.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1, type: 30 });
	const entry = audit.entries.first();

	await client.channels.get('592845625209389069').send(entry.executor);

};