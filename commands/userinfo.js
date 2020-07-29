/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const Discord = require('discord.js');
const read = require('../functions/databaseRead');
const time = require('moment');

module.exports = {
	name: 'userinfo',
	info: 'Info about User',
	desc: 'Shows a users information',
	aliases: [''],
	usage: '',
	args: false,
	guildOnly: true,
	ownerOnly: false,
	group: 'moderation',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message) {
		// Set Variables
		const target = message.mentions.users.first() || message.author;
		const guildTarget = message.mentions.members.first() || message.member;

		const doc = await read(target.id, 'sekure_users', undefined, client);

		// Check for nickname
		let nickname = guildTarget.nickname;
		if (!nickname) nickname = "No guild nickname.";

		// Set title string
		let titleString;
		if (target.id == message.author.id) {
			titleString = `Showing your information`;
		} else {
			titleString = `This is **${target.username}**'s information`;
		}

		// Get users previous names
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

		// Send embed
		const embed = new Discord.MessageEmbed()
			.setTitle(titleString)
			.setDescription(`__**Previous Names**__\n\n${nameString}`)
			.setThumbnail(target.avatarURL())
			.addField('\u200b', '\u200b')
			.addField("Full Username", target.tag, true)
			.addField("ID", target.id, true)
			.addField("Nickname", nickname, true)
			.addField("Total Discord Messages Sent", doc.messages.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","), true)
			.addField("Roles", guildTarget.roles.cache.map(role => `${role}`).join(', '), true)
			.addField("Joined At", `${time(guildTarget.joinedAt).format('ll')} (${time(guildTarget.joinedAt).fromNow()})`, true)
			.addField("Account Created", `${time(target.createdAt).format('ll')} (${time(target.createdAt).fromNow()})`, true)
			.setColor(client.color.basic('green'));


		return message.channel.send(embed);
	},

};