const Discord = require('discord.js');

module.exports = async (client, oldMember, newMember) => {
	if (oldMember.tag != newMember.tag) {
		/* 
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

			// return guildChannel.send(embed);
	}
	return;
};