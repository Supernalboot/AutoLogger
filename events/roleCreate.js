const Discord = require('discord.js');

module.exports = async (client, role) => {

	// Get guild variable
	const guild = role.guild;

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('rolecreate').then(async function(output) { enabled = await output[0].rolecreate; });
	if (!enabled) return;

	// Fetch latest audit, to make sure we will fetch this specific task
	const audit = await guild.fetchAuditLogs({ limit: 1 });
	const entry = await audit.entries.first();

	// Format bot tag
	let bot = '[Bot]';
	if (!entry.executor.bot) bot = '';

	// Format users permissions
	const permissions = [];
	let perms = await new Discord.Permissions(role.permissions);
	if (role.hasPermission("ADMINISTRATOR")) perms = "Administrator";
	else perms = perms.toArray(true);
	for (const perm of perms) {
		const permName = perm.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()).replace(/\s[a-z]/g, c=> c.toUpperCase()).replace('Vad', 'VAD').replace('Tts', 'TTS');
		await permissions.push(permName);
	}

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
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
	return client.channels.get('592845625209389069').send(embed);

};