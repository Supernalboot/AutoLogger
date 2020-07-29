/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */

const read = require('../functions/databaseRead');
const write = require('../functions/databaseWrite');
const Discord = require('discord.js');

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
				.setDescription('To toggle a module on or off copy the module name exactly and paste after the command name.')
				.addField('MessageDelete', `${data.modules.messageDelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('MessageUpdate', `${data.modules.messageUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelCreate', `${data.modules.channelCreate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelDelete', `${data.modules.channelDelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelUpdate', `${data.modules.channelUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleCreate', `${data.modules.roleCreate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleDelete', `${data.modules.roleDelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleUpdate', `${data.modules.roleUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('UserUpdate', `${data.modules.userUpdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.setColor(client.color.basic('blue'));
			//				.addField('UserPFP', `${data.userpfp.toString().replace('true', '✅').replace('false', '🅾')}`, true)
			// 				.addField('Username', `${data.username.toString().replace('true', '✅').replace('false', '🅾')}`, true)
			// Send embed
			return message.channel.send(embed);

		} else {

			const doc = await read(message.guild.id, 'sekure_servers', undefined, client);
			// See if module exists
			const mod = doc.modules[args[0]];
			if (!mod) return message.channel.send("Provided argument is not a module!");

			// Update/toggle module
			if (mod) {
				doc.modules[args[0]] = false;
				await write(message.guild.id, 'sekure_servers', undefined, client);
				return message.channel.send(`\`${args[0]}\` logs have been **disabled**.`);
			} else {
				doc.modules[args[0]] = true;
				await write(message.guild.id, 'sekure_servers', undefined, client);
				return message.channel.send(`\`${args[0]}\` logs have been **enabled**.`);
			}

		}

	},
};