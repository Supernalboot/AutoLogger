const Discord = require('discord.js');
const time = require('moment');

module.exports = async (client, guild) => {
	guild.fetchMembers('', guild.members.size);
	// Delete guild entry
	client.knex.from('guilddata').where('guildid', guild.id).update('isactive', false).then(console.log(`[DATA] Guild ${guild.id} left, isActive is now FALSE!`));
	// Guild leave embed
	const bots = guild.members.filter(m => m.user.bot).size;
	const humans = guild.memberCount - bots;
	const guildLeaveEmbed = new Discord.RichEmbed()
		.addField(`**Left ${guild.name}!**`, `**ID:** \`${guild.id}\`\n**Owner:** \`\`${guild.owner.user.tag}\`\` (*${guild.owner.user.id}*)
**Member Count:** \`${guild.memberCount}\` - **Humans:** \`${humans}\` - **Bots:** \`${bots}\`
**Joined:** ${time(client.user.joinedAt).fromNow()}`)
		.setThumbnail(guild.iconURL)
		.setColor(client.color.basic('red'))
		.setFooter(`Total ${client.guilds.size}`, client.user.displayAvatarURL)
		.setTimestamp(Date.now());
	client.channels.get('592845625209389069').send(guildLeaveEmbed);
};