/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */

const read = require('../functions/databaseRead');
const write = require('../functions/databaseWrite');

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

		const doc = await read(guild.id, 'sekure_servers', undefined, client);

		// Set variables
		const group = args[0];
		const channel = message.guild.channels.get(args[1]);
		if (!channel) return message.channel.send(`Channel ID \`${args[1]}\` does not exist, please double check ID and try again.`);

		if (group == 'member') {
			doc.channels.memberLogID = channel.id;
			await write(doc, 'sekure_servers', undefined, client);
			return message.channel.send(`Member logs will now be logged in ${channel}`);
		} else
			if (group == 'message') {
				doc.channels.messageLogID = channel.id;
				await write(doc, 'sekure_servers', undefined, client);
				return message.channel.send(`Member logs will now be logged in ${channel}`);
			} else
				if (group == 'server') {
					doc.channels.serverLogID = channel.id;
					await write(doc, 'sekure_servers', undefined, client);
					return message.channel.send(`Member logs will now be logged in ${channel}`);
				} else
					if (group == 'all') {
						doc.channels.memberLogID = channel.id;
						doc.channels.messageLogID = channel.id;
						doc.channels.serverLogID = channel.id;
						await write(doc, 'sekure_servers', undefined, client);
						return message.channel.send(`All logs will now be logged in ${channel}`);
					} else { return message.channel.send(`Sorry, \`${group}\` is not a valid log group.`); }
	},
};