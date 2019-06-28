const Discord = require('discord.js');

module.exports = async (client, oldUser, newUser) => {

	// Check if a users tag was updated
	if (oldUser.tag != newUser.tag) {

		// Check if guild has enabled this module
		let enabled;
		await client.knex.from('guilddata').where('guildid', guild.id).select('username').then(async function(output) { enabled = await output[0].username; });
		if (!enabled) return;

		/* TODO implement sudo code
		SUDO CODE

		dataBase.find(newMember.id).add(newMember.tag)

		*/

		// Fill out embed information
		const embed = await new Discord.RichEmbed()
			.setTitle(`**${oldUser.tag}** changed username`)
			.addField('New Username', `\`${newUser.tag}\``, true)
			.addField('User ID', `\`${newUser.id}\``, true)
			.addField("Previous Names", "```<ADD NAMES>```")
			.setFooter('Time of Action')
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		return client.channels.get('592845625209389069').send(embed);
	}

	// Check if a users PFP was Updated
	if (oldUser.displayAvatarURL != newUser.displayAvatarURL) {

		// Check if guild has enabled this module
		let enabled;
		await client.knex.from('guilddata').where('guildid', guild.id).select('userpfp').then(async function(output) { enabled = await output[0].userpfp; });
		if (!enabled) return;

		// Grab log channel
		let logChannel;
		await client.knex.from('guilddata').where('guildid', guild.id).select('memberlogid').then(async function(output) { logChannel = await output[0].memberlogid; });
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