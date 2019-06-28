const Discord = require('discord.js');

module.exports = async (client, oldChannel, newChannel) => {
	// Get guild variable
	const guild = channel.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('channelupdate').then(async function(output) { enabled = await output[0].channelupdate; });
	if (!enabled) return;

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Channel Updated**')
		.addField('Channel', `${channel}\n\`${channel.id}\``, true)
		.addField('Channel Type', `\`${newChannel.type}\``, true)
		.addField('Updated by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('orange'));

	// If a reason was given, add it as description
	if (entry.reason) await embed.setDescription(`**Reason:** ${entry.reason}`);

	// Send embed
	return client.channels.get('592845625209389069').send(embed);
};