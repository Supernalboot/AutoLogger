const Discord = require('discord.js');

module.exports = async (client, oldMember, newMember) => {

	// Check if a users tag was updated
	if (oldMember.tag != newMember.tag) {
		/* TODO
		SUDO CODE
		
		dataBase.find(newMember.id).add(newMember.tag)
		
		*/

		// Fill out embed information
		const embed = await new Discord.RichEmbed()
			.setTitle('**User Updated**')
			.addField('New User', `\`${newMember.tag}\``, true)
			.addField('Old User', `\`${oldMember.tag}\``, true)
			.addField("ID", `\`${newMember.id}\``)
			.addField("Previous Names", "```<ADD NAMES>```")
			.setFooter('Time of Action')
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		// return to each guild user is in guildChannel.send(embed);
	}

	// Check if a users PFP was Updated
	if (oldMember.avatarURL != newMember.avatarURL) {


		// Fill out embed information
		const embed = await new Discord.RichEmbed()
			.setTitle('**User PFP Updated**')
			.setThumbnail(newMember.avatarURL)
			.setImage(oldMember.avatarURL)
			.addField('New User PFP', `\`${newMember.avatarURL}\``, true)
			.addField('Old User', `\`${oldMember.avatarURL}\``)
			.addField("ID", `\`${newMember.id}\``)
			.setFooter('Time of Action')
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		// return guildChannel.send(embed);
	}
	return;
};