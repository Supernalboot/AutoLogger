const Discord = require('discord.js');

module.exports = async (client, channel) => {

	if (!channel.guild) return;
	
	// Get guild variable
	const guild = channel.guild;

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('modules').then(async function(output) { if (output[0]) enabled = await output[0].modules.channelcreate; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('logid').then(async function(output) { if (output[0]) logChannel = await guild.channels.get(output[0].logid.logid); });
	if (!logChannel) return;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Format bot tag
	let bot = ' [Bot]';
	if (!entry.executor.bot) bot = '';
	
	let reason = ''
	if (entry.reason) reason = `**Reason:** ${entry.reason}`

	return logChannel.send(`✅ Channel Created **${channel}** \`${channel.id}\` by **${entry.executor.tag}${bot}** \`${entry.executor.id}\` ${reason}`)
};