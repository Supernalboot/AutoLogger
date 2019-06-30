const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {

	// Get guild variable
	const guild = oldMessage.guild;

	// Return any bots changing messages to reduce spam
	if (oldMessage.author.bot) return;

	// Check if guild has enabled this module
	let enabled;
	await client.knex.from('guilddata').where('guildid', guild.id).select('channelcreate').then(async function(output) { if (output[0]) enabled = await output[0].channelcreate; });
	if (!enabled) return;

	// Grab log channel
	let logChannel;
	await client.knex.from('guilddata').where('guildid', guild.id).select('messagelogid').then(async function(output) { if (output[0]) logChannel = await guild.channels.get(output[0].messagelogid); });
	if (!logChannel) return;

	// Fill out embed information
	const embed = await new Discord.RichEmbed()
		.setAuthor({ name: '**Message Updated**', url: newMessage.url })
		.addField(`**${oldMessage.author.tag}**`, `\`\`\`diff\n- ${oldMessage.content}\n+ ${newMessage.content}\`\`\``, true)
		.setFooter('Time of Action')
		.setTimestamp(Date.now())
		.setColor(client.color.basic('orange'));

	// Send embed
	return logChannel.send(embed);

};