const Discord = require('discord.js');

module.exports = async (client, oldMember, newMember) => {
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