const Discord = require('discord.js');

module.exports = async (client, message) => {

	// Get guild variable
	const guild = message.guild;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('messagedelete').then(async function(output) { enabled = await output[0].messagedelete; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('messagelogid').then(async function(output) { logChannel = await guild.channels.get(output[0].messagelogid); });
	if (!logChannel) return;

	// Return any bots changing messages to reduce spam
	if (entry.executor.bot) return;

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Message Deleted**')
		.addField(`**${message.author.tag}**`, `\`\`\`${message.content}\`\`\``)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));

	// Send embed
	return logChannel.send(embed);

};