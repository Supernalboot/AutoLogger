const Discord = require('discord.js');

module.exports = async (client, guild) => {
	guild.fetchMembers('', guild.members.size);

	// Add information to table
	await client.knex.from('guilddata').where('guildid', guild.id).then(async function(output) {
		if (!output[0]) {
			// Make database changes
			client.knex('guilddata')
				.insert([{
					guildid: guild.id,
				}]).then(console.log(`[DATA] Guild ${guild.id} joined, database has been filled!`));
		} else {
			client.knex.from('guilddata').where('guildid', guild.id).update('isactive', true).then(console.log(`[DATA] Guild ${guild.id} rejoined, isActive is now TRUE!`));
		}
	});

	// Prefix
	let prefix;
	await client.knex.from('guilddata').where('guildid', guild.id).select('prefix').then(async function(output) { prefix = await output[0].prefix; });

	// DM server owner with information
	await guild.owner.send(`Thank you (or a member with admin) for inviting me to **${guild.name}**\n
I am ${client.user}, and I am here to hopefully make your moderation life in this server easier!
I can log just about anything and my logging is highly customizable! Do \`${prefix}setlogs all [Channel ID] to start logging.
I can also peform most admin commands like, mute, kick and ban etc. (COMING SOON)\`
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