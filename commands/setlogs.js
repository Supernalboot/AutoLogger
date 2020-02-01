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
		if (message.deletable) message.delete();

		// Set variables
		const channel = await client.find.channel(args[0], message.guild);
		if (!channel) return message.channel.send(`Channel ID \`${args[1]}\` does not exist, please double check ID and try again.`);

		let logidObject;
		await client.knex.from('guilddata').where('guildid', message.guild.id).select('logid').then(async function (output) { logidObject = await output[0].logid; });
		logidObject.logid = channel.id;
		await client.knex.from('guilddata').where('guildid', message.guild.id).update('logid', logidObject);

		return message.channel.send(`Log channel set to <#${channel.id}>`);
	},
};