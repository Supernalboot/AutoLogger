const Discord = require('discord.js');

module.exports = async (client, oldUser, newUser) => {

	// Check if a users tag was updated
	if (oldUser.tag != newUser.tag) {
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

		// Fill out embed information
		const embed = await new Discord.RichEmbed()
			.setTitle(`**${oldUser.tag}** changed PFP`)
			.setThumbnail(newUser.displayAvatarURL)
			.addField(`New PFP ⇨`, `⇩ Old PFP`)
			.setFooter('Time of Action', oldUser.displayAvatarURL)
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		return client.channels.get('592845625209389069').send(embed);
	}
	return;
};