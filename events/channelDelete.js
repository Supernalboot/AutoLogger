const Discord = require('discord.js');

module.exports = async (client, channel) => {
	// Get guild variable
	const guild = channel.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('channeldelete').then(async function(output) { if (output[0]) enabled = await output[0].channeldelete; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('serverlogid').then(async function(output) { if (output[0]) logChannel = await guild.channels.get(output[0].serverlogid); });
	if (!logChannel) return;

	// Format bot tag
	let bot = '[Bot]';
	if (!entry.executor.bot) bot = '';

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Channel Deleted**')
		.addField('Channel', `${channel}\n\`${channel.id}\``, true)
		.addField('Channel Type', `\`${channel.type}\``, true)
		.addField('Deleted by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('orange'));

	// If a reason was given, add it as description
	if (entry.reason) await embed.setDescription(`**Reason:** ${entry.reason}`);

	// Send embed
	return logChannel.send(embed);
};