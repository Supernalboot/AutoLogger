/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
module.exports = {
	name: 'setprefix',
	info: 'Change the prefix for this server',
	desc: 'Changes the prefix for this server to whatever you wish (no spaces/ASCII only/up to 4 characters)',
	aliases: ['prefix'],
	usage: '[new prefix]',
	args: false,
	guildOnly: true,
	ownerOnly: false,
	group: 'server',
	perm: 'ADMINISTRATOR',
	perms: ['SEND_MESSAGES'],
	cooldown: 10,

	/** - - Code to Run - - */
	async execute(client, message, args, Discord, prefix) {
		if (message.deletable) message.delete();
		// No args
		if (!args.length) {
			const prefixEmbed = new Discord.MessageEmbed()
				.setTitle(`The current prefix for **${message.guild.name}** is \`${prefix}\``)
				.setColor(client.color.basic('blue'));
			message.channel.send(prefixEmbed);
		}
		// With args
		else {
			const oldfix = prefix;
			const newfix = args[0].toLowerCase();
			if (/[^0-9a-zA-Z!@#$%^&*()_\-+={}[\]|?\\<>~`/;:'".,]/g.test(newfix)) return message.channel.send('Prefix can only be ASCII characters').then(m => m.delete(5000));
			if (newfix.length > 4) return message.channel.send('You can only change the prefix to 4 or less characters long').then(m => m.delete(5000));
			await client.knex.from('guilddata').where('guildid', message.guild.id).update('prefix', newfix).then(console.log(`Guild ${message.guild.id} changed prefix, prefix is now '${newfix}'!`));
			const prefixEmbed = new Discord.MessageEmbed()
				.setTitle(`Prefix changed for **${message.guild.name}**`)
				.addField(`New Prefix: **${args[0]}**`, `Old Prefix: **${oldfix}**`)
				.setColor(client.color.basic('blue'));
			message.channel.send(prefixEmbed);
		}
	},
};