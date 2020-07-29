/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');
const read = require("../functions/databaseRead");

module.exports = async (client, message) => {

	// Get guild variable
	const guild = message.guild;

	// Collect our Doc.
	const doc = await read(guild.id, 'sekure_servers', undefined, client);

	// Check if guild has enabled this module
	if (doc.modules.messageDelete == false) return;

	// Grab log channel
	const logChannel = doc.channels.messageLogID;
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