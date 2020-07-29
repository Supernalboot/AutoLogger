/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */

const read = require('../functions/databaseRead');

module.exports = {
	name: 'togglelog',
	info: 'Toggle log modules on or off',
	desc: 'Decide which logs you want on or off, can do almost every event',
	aliases: ['toggle'],
	usage: ['(module)'],
	args: false,
	guildOnly: true,
	ownerOnly: false,
	group: 'server',
	perm: 'ADMINISTRATOR',
	perms: ['SEND_MESSAGES'],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		if (message.deletable) message.delete();

		// If no args given, show what modules are currently set too.
		if (!args.length) {

			// Grab current settings from database
			const data = await read(message.guild.id, 'sekure_servers', undefined, client);

			// Fill out embed information
			const embed = await new Discord.MessageEmbed()
				.setTitle('**Current Module Toggles**')
				.addField('MessageDelete', `${data.messageDelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('MessageUpdate', `${data.messageUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelCreate', `${data.channelCreate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelDelete', `${data.channelDelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelUpdate', `${data.channelUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleCreate', `${data.roleCreate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleDelete', `${data.roleDelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleUpdate', `${data.roleUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('UserPFP', `${data.userpfp.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('Username', `${data.username.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.setColor(client.color.basic('blue'));
			// Send embed
			return message.channel.send(embed);

		} else {

			const doc = await read(message.guild.id, 'sekure_servers', undefined, client);
			// See if module exists
			let mod = doc.modules;

			if (!mod) return message.channel.send("Provided arguement is not a module!");

			// Update/toggle module
			if (mod) {
				await client.knex.from('guilddata').where('guildid', message.guild.id).update(args[0].toLowerCase(), 'false');
				return message.channel.send(`\`${args[0]}\` logs have been **disabled**.`);
			} else {
				await client.knex.from('guilddata').where('guildid', message.guild.id).update(args[0].toLowerCase(), 'true');
				return message.channel.send(`\`${args[0]}\` logs have been **enabled**.`);
			}

		}

	},
};