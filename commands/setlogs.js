module.exports = {
	name: 'setlogs',
	info: 'Set which channel to log to',
	desc: 'Define which channels you want to log to, if you want to set all to one just do `setlogs all [channelid]',
	aliases: ['setlog'],
	usage: '(member/message/server/all) [channel id]',
	args: true,
	guildOnly: true,
	ownerOnly: false,
	group: 'server',
	perm: 'ADMINISTRATOR',
	perms: ['SEND_MESSAGES'],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {

		// Set variables
		const group = args[0];
		const channel = client.channels.get(args[1]);
		if (!channel) return message.channel.send(`Channel ID \`${args[1]}\` does not exist, please double check ID and try again.`);

		if (group == 'member') {
			await client.knex.from('guilddata').where('guildid', message.guild.id).update('memberlogid', channel.id).then();
			return message.channel.send(`Member logs will now be logged in ${channel}`);
		} else
		if (group == 'message') {
			await client.knex.from('guilddata').where('guildid', message.guild.id).update('messagelogid', channel.id).then();
			return message.channel.send(`Member logs will now be logged in ${channel}`);
		} else
		if (group == 'server') {
			await client.knex.from('guilddata').where('guildid', message.guild.id).update('serverlogid', channel.id).then();
			return message.channel.send(`Member logs will now be logged in ${channel}`);
		} else
		if (group == 'all') {
			await client.knex.from('guilddata').where('guildid', message.guild.id).update('memberlogid', channel.id).update('messagelogid', channel.id).update('serverlogid', channel.id).then();
			return message.channel.send(`All logs will now be logged in ${channel}`);
		} else { return message.channel.send(`Sorry, \`${group}\` is not a valid log group.`); }

	},
};