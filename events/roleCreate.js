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
	if (doc.modules.roleCreate == false) return;

	// Grab log channel
	const logChannel = doc.channels.serverLogID;
	if (!logChannel) return;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Format bot tag
	let bot = '[Bot]';
	if (!entry.executor.bot) bot = '';

	// Format users permissions
	const permissions = [];
	let perms = new Discord.Permissions(role.permissions);
	if (role.hasPermission("ADMINISTRATOR")) perms = "Administrator";
	else perms = perms.toArray(true);
	for (const perm of perms) {
		const permName = perm.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()).replace(/\s[a-z]/g, c => c.toUpperCase()).replace('Vad', 'VAD').replace('Tts', 'TTS');
		permissions.push(permName);
	}

	// Fill out embed information
	const embed = await new Discord.MessageEmbed()
		.setTitle('**Role Created**')
		.addField('Role', `<@&${role.id}>\n\`${role.id}\``, true)
		.addField('Created by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
		.addField('Permissions', permissions.join(' | '))
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('green'));

	// If a reason was given, add it as description
	if (entry.reason) await embed.setDescription(`**Reason:** ${entry.reason}`);

	// Send embed
	return logChannel.send(embed);

};