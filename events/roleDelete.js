const Discord = require('discord.js');

module.exports = async (client, role) => {

	// Get guild variable
	const guild = role.guild;

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('roledelete').then(async function(output) { if (output[0]) enabled = await output[0].roledelete; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('serverlogid').then(async function(output) { if (output[0]) logChannel = await guild.channels.get(output[0].serverlogid); });
	if (!logChannel) return;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Format bot tag
	let bot = '[Bot]';
	if (!entry.executor.bot) bot = '';

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Role Deleted**')
		.addField('Role', `@${role.name}\n\`${role.id}\``, true)
		.addField('Deleted by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));

	// If a reason was given, add it as description
	if (entry.reason) await embed.setDescription(`**Reason:** ${entry.reason}`);

	// Send embed
	return logChannel.send(embed);

};