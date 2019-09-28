const Discord = require('discord.js');

module.exports = async (client, oldUser, newUser) => {

	// Get all guilds that have this user as a member
	const guilds = [];
	for (const guild of client.guilds) {
		if (guild[1].members.get(oldUser.id) != null) {
			guilds.push(guild[1]);
		}
	} console.log(guilds);

	// TODO Tyrdle: Fix this sblock of code to match with the database
	// Check if a users tag was updated
	if (oldUser.tag != newUser.tag) {

		// Check if guild has enabled this module
		let enabled;
		await client.knex.from('guilddata').where('guildid', guild.id).select('username').then(async function (output) { enabled = await guild.channels.get(output[0].username); });
		if (!enabled) return;

		// Fill out embed information
		const embed = new Discord.RichEmbed()
			.setTitle(`**${oldUser.tag}** changed username`)
			.addField('New Username', `\`${newUser.tag}\``, true)
			.addField('User ID', `\`${newUser.id}\``, true)
			.addField("Previous Names", nameString)
			.setFooter('Time of Action')
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		// Loop through guilds to send update
		guilds.forEach(async element => {
			const doc = await read(element.id, 'cz_guilds');
			const logChannel = element.channels.get(doc.logid);
			if (!logChannel) return;
			logChannel.send(embed);
		});

		// This is not needed when fixed
		return client.channels.get('592845625209389069').send(embed);
	}

	// Check if a users PFP was Updated
	if (oldUser.displayAvatarURL != newUser.displayAvatarURL) {

		// Check if guild has enabled this module
		let enabled;
		await client.knex.from('guilddata').where('guildid', guild.id).select('userpfp').then(async function (output) { if (output[0]) enabled = await output[0].userpfp; });
		if (!enabled) return;

		// Grab log channel
		let logChannel;
		await client.knex.from('guilddata').where('guildid', guild.id).select('memberlogid').then(async function (output) { if (output[0]) logChannel = await output[0].memberlogid; });
		if (!logChannel) return;

		// Fill out embed information
		const embed = await new Discord.RichEmbed()
			.setTitle(`**${oldUser.tag}** changed PFP`)
			.setThumbnail(newUser.displayAvatarURL)
			.addField(`New Profile Picture ⇨`, `⇩ Old Profile Picture`)
			.setFooter('Time of Action', oldUser.displayAvatarURL)
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		// Send embed
		return logChannel.send(embed);

	}

	else { return; }
};