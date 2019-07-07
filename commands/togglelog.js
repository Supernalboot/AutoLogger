module.exports = {
	name: 'togglelog',
	info: 'Toggle log modules on or off',
	desc: 'Decide which logs you want on or off, can do almost every event',
	aliases: ['toggle'],
	usage: '(module)',
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
			let data;
			await client.knex.from('guilddata').where('guildid', message.guild.id).select('*').then(async function(output) { if (output[0]) data = await output[0]; });

			// Fill out embed information
			const embed = await new Discord.RichEmbed()
				.setTitle('**Current Module Toggles**')
				.addField('MessageDelete', `${data.messagedelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('MessageUpdate', `${data.messageupdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelCreate', `${data.channelcreate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelDelete', `${data.channeldelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('ChannelUpdate', `${data.channelupdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleCreate', `${data.rolecreate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleDelete', `${data.roledelete.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('RoleUpdate', `${data.roleupdate.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('UserPFP', `${data.userpfp.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.addField('Username', `${data.username.toString().replace('true', '✅').replace('false', '🅾')}`, true)
				.setColor(client.color.basic('blue'));
			// Send embed
			return message.channel.send(embed);

		} else {

			// See if module exists
			let mod;
			await client.knex.from('guilddata').where('guildid', message.guild.id).select(args[0].toLowerCase()).then(async function(output) {
				if (output[0]) mod = await output[0][args[0].toLowerCase()];
			}).catch(error => { message.channel.send(`Sorry, ${args[0]} is not a module.`); throw error; });

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