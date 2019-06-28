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
			.setTitle('**User Updated**')
			.addField('New User', `\`${newUser.tag}\``, true)
			.addField('Old User', `\`${oldUser.tag}\``, true)
			.addField("ID", `\`${newUser.id}\``)
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
			.setTitle('**Member PFP Updated**')
			.setThumbnail(newUser.displayAvatarURL)
			.setImage(oldUser.displayAvatarURL)
			.addField(`${oldUser.user.tag} change their PFP`, `New PFP ⇨\nOld PFP ⇩`)
			.setFooter('Time of Action')
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		return client.channels.get('592845625209389069').send(embed);
	}
	return;
};