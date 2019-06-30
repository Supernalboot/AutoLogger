const Discord = require('discord.js');

module.exports = async (client, message) => {

	// Get guild variable
	const guild = message.guild;

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('messagedelete').then(async function(output) { if (output[0]) enabled = await output[0].messagedelete; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('messagelogid').then(async function(output) { if (output[0]) logChannel = await guild.channels.get(output[0].messagelogid); });
	if (!logChannel) return;

	// Return any bots changing messages to reduce spam
	if (message.user.bot) return;

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