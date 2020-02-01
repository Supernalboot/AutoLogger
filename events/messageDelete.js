const Discord = require('discord.js');

module.exports = async (client, message) => {

	// Get guild variable
	const guild = message.guild;

	// Return any bot messages to reduce spam
	if (message.author.bot) return;

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('modules').then(async function(output) { if (output[0]) enabled = await output[0].modules.messagedelete; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('logid').then(async function(output) { if (output[0]) logChannel = await guild.channels.get(output[0].logid.logid); });
	if (!logChannel) return;

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setTitle('**Message Deleted**')
		.addField(`**${message.author.tag}**`, `\`\`\`${message.content}\`\`\``, true)
		.addField(`**Channel**`, `${message.channel}`, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));

	// Send embed
	return logChannel.send(embed);

};