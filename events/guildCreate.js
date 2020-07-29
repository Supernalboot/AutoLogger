/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');
const read = require('../functions/databaseRead');
const write = require('../functions/databaseWrite');

module.exports = async (client, guild) => {
	guild.members.fetch();

	// Read for existing document
	let doc = await read(guild.id, 'sekure_servers', undefined, client);
	// Create document if no doc is found
	if (!doc) { doc = require('../templates/server.json'); doc._id = guild.id; await write(doc, 'sekure_servers', undefined, client); }

	// Prefix
	let prefix;
	await client.knex.from('guilddata').where('guildid', guild.id).select('prefix').then(async function (output) { prefix = await output[0].prefix; });

	// DM server owner with information
	await guild.owner.send(`Thank you (or a member with admin) for inviting me to **${guild.name}**\n
I am ${client.user}, and I am here to hopefully make your moderation life in this server easier!
I can log just about anything and my logging is highly customizable! Do \`${prefix}setlogs all [Channel ID] to start logging.
I can also perform most admin commands like, mute, kick and ban etc. (COMING SOON)\`
Something unique about me is I can \`${prefix}encrypt\` and \`${prefix}decrypt\` messages for you.`);

	// Guild join embed
	const bots = guild.members.filter(m => m.user.bot).size;
	const humans = guild.memberCount - bots;
	const guildJoinEmbed = new Discord.RichEmbed()
		.addField(`**Joined ${guild.name}!**`, `**ID:** \`${guild.id}\`\n**Owner:** \`\`${guild.owner.user.tag}\`\` (*${guild.owner.user.id}*)
**Member Count:** \`${guild.memberCount}\` - **Humans:** \`${humans}\` - **Bots:** \`${bots}\` - **Human %:** \`${(100 * (humans / (guild.memberCount))).toFixed(1)}%\``)
		.setThumbnail(guild.iconURL)
		.setColor(client.color.basic('green'))
		.setFooter(`Total: ${client.guilds.size}`, client.user.displayAvatarURL)
		.setTimestamp(Date.now());
	client.channels.get('592845625209389069').send(guildJoinEmbed);
};