/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
module.exports = {
	name: 'ping',
	info: 'Ping the bot',
	desc: 'Your basic ping pong command to test if the bot is working',
	aliases: ['pong'],
	usage: '',
	args: false,
	guildOnly: false,
	ownerOnly: false,
	group: 'client',
	perm: 'ANY',
	perms: ['SEND_MESSAGES'],
	cooldown: 3,

	/** - - Code to Run - - */
	async execute(client, message) {
		if (message.deletable) message.delete();
		const m = await message.channel.send({ embed: { color: 0x3AFF84, description: 'Ping is *Calculating*...' } });
		m.edit({ embed: { color: 0x3AFF84, title: '🏓 **Pong!** 🏓', description: `Latency is ${m.createdTimestamp - message.createdTimestamp}ms\nAPI Latency is ${Math.round(client.ping)}ms` } });
	},
};
