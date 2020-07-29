/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');

module.exports = async (client, oldUser, newUser) => {

	if (newUser.id == '618255357747134464') return;
	if (newUser.bot == true) return;

	// Get all guilds that have this user as a member
	const guilds = [];
	for (const guild of client.guilds.cache) {
		if (guild[1].members.cache.get(oldUser.id) != null) {
			guilds.push(guild[1]);
		}
	}

	// Check if a users tag was updated
	if (oldUser.tag != newUser.tag) {
		let doc = await read(newUser.id, 'sekure_users', undefined, client);

		if (!doc) {
			const templateDoc = require('../templates/userData.json');
			templateDoc._id = newUser.id;
			await write(templateDoc, "sekure_users", undefined, client);
			doc = await read(newUser.id, "sekure_users", undefined, client);
		}

		// Check if new name wasn't there
		if (!doc.prevNames.includes(newUser.tag)) doc.prevNames.push(newUser.tag);

		await write(doc, 'sekure_users', undefined, client);

		// collect Prev names
		let nameString = '';
		let i = 0;
		for (const element of doc.prevNames) {
			if (nameString.length > 2000) {
				nameString += `Plus ${doc.prevNames.length - i} more...`;
				break;
			}
			nameString += `${element}\n`;
			i++;
		}

		// Fill out embed information
		const embed = new Discord.MessageEmbed()
			.setTitle(`**${oldUser.tag}** changed username`)
			.setDescription(`__**Previous Names**__\n\n${nameString}`)
			.addField('New Username', `\`${newUser.tag}\``, true)
			.addField('User ID', `\`${newUser.id}\``, true)
			.setFooter('Time of Action')
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		for (const guild of guilds) {
			const guildDoc = await read(guild.id, 'sekure_servers', undefined, client);
			const logChannel = guild.channels.cache.get(guildDoc.logid);
			if (!logChannel || doc.modules.userUpdate == false) return;
			const loopEmbed = embed;
			loopEmbed.addField('User', guild.members.cache.get(newUser.id));
			logChannel.send(loopEmbed);
		}

		return;
	}

	// Check if a users PFP was Updated
	if (oldUser.displayAvatarURL() != newUser.displayAvatarURL()) {
		// Fill out embed information
		const embed = new Discord.MessageEmbed()
			.setTitle(`**${oldUser.tag}** changed PFP`)
			.setThumbnail(newUser.displayAvatarURL({ dynamic: true }))
			.addField(`New Profile Picture ⇨`, `⇩ Old Profile Picture`)
			.setFooter('Time of Action')
			.setImage(oldUser.displayAvatarURL({ dynamic: true }))
			.setTimestamp(Date.now())
			.setColor(client.color.basic('orange'));

		guilds.forEach(async element => {
			let logChannel;
			const doc = await read(element.id, 'sekure_servers', undefined, client);
			try { logChannel = element.channels.cache.get(doc.logid); } catch (e) { return; }
			if (!logChannel || doc.modules.userUpdate == false) return;
			logChannel.send(embed);
		});
	}

	else { return; }
};