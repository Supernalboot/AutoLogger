Discord = require('discord.js');

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
	async execute(client, message, args) {
		const target = message.mentions.users.first() || message.author;
		const guildTarget = message.mentions.members.first() || message.member;
		let nickname = message.member.nickname;
		if (!nickname) nickname = "No guild nickname.";

		const embed = new Discord.RichEmbed()
			.setAuthor(target.tag)
			.setDescription("This is the user's info!")
			.setColor()
			.setThumbnail(target.avatarURL)
			.addField("Nickname", nickname, true)
			.addField("ID", `\`${target.id}\``, true)
			.addField("Roles", "```<UNDEFINED>```")
			.addBlankField()
			.addField("Presence", " ")
			.addBlankField()
			.addField("Created At", target.createdAt)
			.addField("Joined At", guildTarget.joinedAt);

		message.channel.send(embed);
	},
};