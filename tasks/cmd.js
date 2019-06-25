const Discord = require('discord.js');
const { owners } = require('../config.json');

module.exports = async (client, message, command, commandName, args, prefix) => {

	/** - - Command Handler - - */
	try {
		// Check for args
		if (command.args && !args.length) { return message.channel.send('You didn\'t provide any arguments!'); }
		// Check for perm, guildOnly, ownerOnly and args
		if (command.guildOnly && message.channel.type !== 'text') return message.channel.send(`The \`${commandName}\` command is only available in servers!`);
		if (command.ownerOnly && !owners.includes(message.author.id)) return;
		// Check user permissions
		if (message.guild) {
			if (command.perm !== 'ANY') {
				const userBitfield = new Discord.Permissions(message.member.permissionsIn(message.channel).bitfield);
				if (!userBitfield.has(command.perm, true)) {return message.channel.send(`You need the \`${command.perm}\` permission to use the \`${commandName}\` command in ${message.channel}!`)
					.catch(err => { return message.author.send(`You need the \`${command.perm}\` perms to use the \`${commandName}\` command in ${message.channel}, please make sure I have all of them!`).catch(err); }); }
			}
		}
		// Check client perms and message if not correct
		const perms = command.perms.join(', ').replace(/[_]/g, ' ');
		if (message.guild) {
			const bitfield = new Discord.Permissions(message.guild.me.permissionsIn(message.channel).bitfield);
			if (!bitfield.has(command.perms, true)) { return message.channel.send(`I need \`${perms}\` perms to use the \`${commandName}\` command in ${message.channel}, please make sure I have all of them!`)
				.catch(err => { return message.author.send(`I need \`${perms}\` perms to use the \`${commandName}\` command in ${message.channel}, please make sure I have all of them!`).catch(err); }); }
		}
		// Check command cooldown
		if (!owners.includes(message.author.id)) {
			if (!client.cooldowns.has(command.name)) { client.cooldowns.set(command.name, new Discord.Collection()); }
			const timestamps = client.cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown) * 1000;
			// Check if user has cooldown
			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
				// Check if user has passwed cooldown
				if (Date.now() < expirationTime) {
					const timeLeft = (expirationTime - Date.now()) / 1000;
					return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${prefix}${commandName}\` command.`);
				}
			} timestamps.set(message.author.id, Date.now());
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		// Run the Command
		try {
			command.execute(client, message, args, Discord, prefix, owners);
			// Check if owner or not
			if (!owners.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setTimestamp(Date.now())
					.setColor(client.color.light('purple'));
				// Check type of channel and if args, return command log embed
				if (!message.guild) {
					if (!args.length) {
						embed.setDescription(`**${message.author.tag}** used \`${prefix}${commandName}\` in DMs`);
					} else { embed.setDescription(`**${message.author.tag}** used \`${prefix}${commandName}\` with args \`${args.join(' ')}\` in DMs`); }
				} else if (!args.length) {
					embed.setDescription(`**${message.author.tag}** used \`${prefix}${commandName}\` in *${message.guild.name}*`);
				} else { embed.setDescription(`**${message.author.tag}** used \`${prefix}${commandName}\` with args \`${args.join(' ')}\` in *${message.guild.name}*`); }
				client.channels.get('592845625209389069').send(embed);
			}
		}
		catch(err) { console.error(err); message.channel.send(`There was an error trying to execute the \`${commandName}\` command!\nIf problem persists please contact ${client.user.username} Support`); }
	} catch (err) { client.channels.get('592845625209389069').send(`An error occured during the command handler, here are the details!\n**Guild** ${message.guild.name} (${message.guild.id})\n**Message** ${message.content}\n\`\`\`${err.stack}\`\`\``); }

};