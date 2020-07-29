/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {

	// Get guild variable
	const guild = oldMessage.guild;

	// Return any bots changing messages to reduce spam
	if (oldMessage.author.bot) return;

	// Collect our Doc.
	const doc = await read(guild.id, 'sekure_servers', undefined, client);

	// Check if guild has enabled this module
	if (doc.modules.messageUpdate == false) return;

	// Grab log channel
	const logChannel = doc.channels.messageLogID;
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