module.exports = {
	name: 'togglelog',
	info: 'Toggle log modules on or off',
	desc: 'Decide which logs you want on or off, can do almost every event',
	aliases: ['toggle',],
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
			await client.knex.from('guilddata').where('guildid', message.guild.id).select('modules').then(async function(output) { if (output[0]) data = await output[0].modules; });

			// Fill out embed information
			const embed = await new Discord.RichEmbed()
				.setTitle('**Current Module Settings**')
				.addField(`${data.messagedelete.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Message Delete', true)
				.addField(`${data.messageupdate.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Message Update', true)
				.addBlankField()
				.addField(`${data.channelcreate.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Channel Create', true)
				.addField(`${data.channeldelete.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Channel Delete', true)
				.addField(`${data.channelupdate.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Channel Update', true)
				.addBlankField()
				.addField(`${data.rolecreate.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Role Create', true)
				.addField(`${data.roledelete.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Role Delete', true)
				.addField(`${data.roleupdate.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Role Update', true)
				.addBlankField()
				.addField(`${data.username.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'Username', true)
				.addField(`${data.userpfp.toString().replace('true', '✅ - Enabled').replace('false', '🅾 - Disabled')}`, 'User PFP', true)
				.setColor(client.color.basic('blue'));
			// Send embed
			return message.channel.send(embed);

		} else {

			// See if module exists
			let modules;
			await client.knex.from('guilddata').where('guildid', message.guild.id).select("modules").then(async function(output) {
				if (output[0]) modules = await output[0].modules;
			})

			if (modules[args[0]] == null) return message.channel.send(`Sorry, ${args[0]} is not a available module`);

			if (modules[args[0]])
			{
				modules[args[0]] = false;
				message.channel.send(`${args[0]} logs have been **disabled**.`);
			}
			else
			{
				modules[args[0]] = true;
				message.channel.send(`${args[0]} logs have been **enabled**.`);
			}

			return await client.knex.from('guilddata').where('guildid', message.guild.id).update("modules", modules);
		}

	},
};