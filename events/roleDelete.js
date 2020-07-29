/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');
const read = require('../functions/databaseRead');

module.exports = async (client, role) => {

	// Get guild variable
	const guild = role.guild;

	// Collect our Doc.
	const doc = await read(guild.id, 'sekure_servers', undefined, client);

	// Check if guild has enabled this module
	if (doc.modules.roleDelete == false) return;

	// Grab log channel
	const logChannel = doc.channels.serverLogID;
	if (!logChannel) return;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Format bot tag
	let bot = '[Bot]';
	if (!entry.executor.bot) bot = '';

	// Fill out embed information
	const embed = await new Discord.MessageEmbed()
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