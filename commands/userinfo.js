const Discord = require('discord.js');
require('moment');

module.exports = {
	name: 'userinfo',
	info: 'Info about User',
	desc: 'Shows a users information',
	aliases: [''],
	usage: '',
	args: false,
	guildOnly: true,
	ownerOnly: false,
	group: 'client/moderation/server',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message) {
		// Set Variables
		const target = message.mentions.users.first() || message.author;
		const guildTarget = message.mentions.members.first() || message.member;
		let nickname = message.member.nickname;
		if (!nickname) nickname = "No guild nickname.";

		// Send embed
		const embed = new Discord.RichEmbed()
			.setTitle(`This is **${target.username}'s information`)
			.setThumbnail(target.avatarURL)
			.addField("Nickname", nickname, true)
			.addField("ID", `\`${target.id}\``, true)
			.addField("Roles", "```<UNDEFINED>```")
			.addBlankField()
			.addField("Presence", "E")
			.addBlankField()
			.addField("Created At", target.createdAt)
			.addField("Joined At", guildTarget.joinedAt);

		message.channel.send(embed);
	},
};