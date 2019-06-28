/*
 * Copyright (C) 2019  Joshua McCrystal
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Joshua McCrystal <joshua.mccrystal@hotmail.com>, 28/03/2019
*/

module.exports = {
	name: 'help',
	args: false,
	guildOnly: false,
	ownerOnly: false,
	group: '',
	perm: 'ANY',
	perms: ['SEND_MESSAGES'],
	cooldown: 3,

	/** - - Code to Run - - */
	async execute(client, message, args, Discord, prefix, owners) {
		if (message.deletable) message.delete();
		// Variables
		const commands = client.commands;
		let clientCommands; let modCommands; let serverCommands;

		/** - - No Group or Command - - */
		if (!args.length) {
			// Map Commands to respective groups
			clientCommands = commands.filter(command => command.group === 'client' && command.name !== 'help').map(command => `\`${command.name}\``).join(', ');
			modCommands = commands.filter(command => command.group === 'moderation').map(command => `\`${command.name}\``).join(', ');
			serverCommands = commands.filter(command => command.group === 'server').map(command => `\`${command.name}\``).join(', ');
			cryptoCommands = commands.filter(command => command.group === 'crypto').map(command => `\`${command.name}\``).join(', ');
			if (owners.includes(message.author.id)) {
				ownerCommands = commands.filter(command => command.group === 'owner').map(command => `\`${command.name}\``).join(', ');
			}
			// Send DM message
			let helpEmbed;
			let prefixtxt;
			if (prefix) prefixtxt = `*${message.guild.name}'s current prefix is: \`${prefix}\`*\n\n`;
			else prefixtxt = '';
			// Owner embed
			if (owners.includes(message.author.id)) {
				helpEmbed = new Discord.RichEmbed()
					.addField('**Omni** Commands', `${prefixtxt}
**Client** Commands:\n${clientCommands}\n\n**Moderation** Commands:\n${modCommands}\n\n**Crypto** Commands:\n${cryptoCommands}\n\n**Server** Commands:\n${serverCommands}\n
**Owner Commands**:\n${ownerCommands}`)
					.addBlankField()
					.setTimestamp(`${Date()}`)
					.setColor(client.color.basic('omni'));
			}
			// Normal embed
			else {
				helpEmbed = new Discord.RichEmbed()
					.addField('**Omni** Commands', `${prefixtxt}
**Client** Commands:\n${clientCommands}\n\n**Moderation** Commands:\n${modCommands}\n\n**Crypto** Commands:\n${cryptoCommands}\n\n**Server** Commands:\n${serverCommands}\n
For more information do \`${prefix}help\` \`client/moderation/server\`
or for command specific help do \`${prefix}help\` \`command\``)
					.addBlankField()
					.setTimestamp(`${Date()}`)
					.setColor(client.color.basic('omni'));
			}
			// Send embed
			return message.author.send(helpEmbed).then(() => {
				if (message.channel.type === 'dm') return;
				message.reply(' I\'ve sent you a DM with all my commands!');
			}).catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply(' it seems like I can\'t DM you! Do you have DMs disabled?');
			});
		}

		/** - - Get Group - - */
		let groupEmbed;
		// Owner embed
		if (args[0].toLowerCase() === 'owner' && owners.includes(message.author.id)) {
			const groupCommands = commands.filter(command => command.group === args[0]).map(command => `**${command.name}** \`${command.info}\``).join('\n');
			groupEmbed = new Discord.RichEmbed()
				.addField(`**${args[0].replace(/^\w/, c => c.toUpperCase())}** Commands`, `${groupCommands}`)
				.setTimestamp(`${Date()}`)
				.setColor(client.color.basic('omni'));
			return message.channel.send(groupEmbed);
		}
		// Normal embed
		else if (args[0].toLowerCase() === 'client' || args[0].toLowerCase() === 'moderation' || args[0].toLowerCase() === 'server' || args[0].toLowerCase() === 'crypto') {
			const groupCommands = commands.filter(command => command.group === args[0]).map(command => `**${command.name}** \`${command.info}\``).join('\n');
			groupEmbed = new Discord.RichEmbed()
				.addField(`**${args[0].replace(/^\w/, c => c.toUpperCase())}** Commands`, `${groupCommands}\n\nFor command specific help do \`${prefix}help\` \`command\``)
				.setTimestamp(`${Date()}`)
				.setColor(client.color.basic('omni'));
			return message.author.send(groupEmbed).then(() => {
				if (message.channel.type === 'dm') return;
				message.reply(` I've sent you a DM with all my **${args[0].replace(/^\w/, c => c.toUpperCase())}** commands!`);
			}).catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply(' it seems like I can\'t DM you! Do you have DMs disabled?');
			});
		}
		if (args[0].toLowerCase() === 'help') { return message.channel.send(`Do \`${prefix}help\` for help!`); }

		/** - - Get Command - - */
		if (args.length <= 1) {
			// Check if command exists
			const name = args[0].toLowerCase();
			const command = await commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
			if (!command) {
				return message.reply('that\'s not a valid command!');
			}
			if (command.ownerOnly && !owners.includes(message.author.id)) return message.reply('that\'s not a valid command!');
			// Gather command data
			const data = [];
			await data.push(`${command.desc}\n`);
			if (command.usage) await data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\`\n*[Mandatory] (Optional)*\n`);
			if (command.aliases[0]) await data.push(`**Aliases:** \`${command.aliases.join(', ')}\``);
			await data.push(`**Group:** ${command.group.replace(/^\w/, c => c.toUpperCase())}`);
			if (command.guildOnly) await data.push('**Server Only:** Yes'); else await data.push('**Server Only:** No');
			await data.push(`**Permission:** ${command.perm}`);
			await data.push(`**Cooldown:** ${command.cooldown} second(s)`);
			// Send embed
			const cmdEmbed = new Discord.RichEmbed()
				.addField(`**${command.name.replace(/^\w/, c => c.toUpperCase())}** Command`, data)
				.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
				.setTimestamp(`${Date()}`)
				.setColor(client.color.basic('omni'));
			return message.channel.send(cmdEmbed);
		}
	},
};