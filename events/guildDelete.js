/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');
const time = require('moment');
const read = require('../functions/databaseRead');
const write = require('../functions/databaseWrite');

module.exports = async (client, guild) => {
	guild.members.fetch();

	// Collect our doc
	const doc = await read(guild.id, 'sekure_servers', undefined, client);
	// Delete guild entry
	doc.isActive = false;
	await write(guild.id, 'sekure_servers', undefined, client);

	// Guild leave embed
	const bots = guild.members.filter(m => m.user.bot).size;
	const humans = guild.memberCount - bots;
	const guildLeaveEmbed = new Discord.MessageEmbed()
		.addField(`**Left ${guild.name}!**`, `**ID:** \`${guild.id}\`\n**Owner:** \`\`${guild.owner.user.tag}\`\` (*${guild.owner.user.id}*)
**Member Count:** \`${guild.memberCount}\` - **Humans:** \`${humans}\` - **Bots:** \`${bots}\`
**Joined:** ${time(client.user.joinedAt).fromNow()}`)
		.setThumbnail(guild.iconURL)
		.setColor(client.color.basic('red'))
		.setFooter(`Total ${client.guilds.size}`, client.user.displayAvatarURL)
		.setTimestamp(Date.now());
	client.channels.get('592845625209389069').send(guildLeaveEmbed);
};