/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
module.exports = {
	name: 'name',
	info: 'info about command',
	desc: 'longer version info for help command here',
	aliases: ['aliases'],
	usage: '',
	args: false,
	guildOnly: true,
	ownerOnly: false,
	group: 'client/moderation/server',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		message.channel.send(args);
	},
};