const Discord = require('discord.js');
const time = require('moment');

module.exports = {
	name: 'userinfo',
	info: 'Info about User',
	desc: 'Shows a users information',
	aliases: ['uinfo'],
	usage: '',
	args: false,
	guildOnly: true,
	ownerOnly: false,
	group: 'moderation',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		if (message.deletable) message.delete();

		// Set Variables
		let user; let member
		if (args[0]) member = await client.find.member(args.join(" "), message.guild); else member = message.member; user = member.user;
		if (!user) return;
		let nickname = member.nickname;
		if (!nickname) nickname = "No guild nickname.";

		// Send embed
		const embed = new Discord.RichEmbed()
			.setTitle(`This is **${user.username}**'s information`)
			.setThumbnail(user.avatarURL)
			.addField("Full Username", user.tag, true)
			.addField("ID", user.id, true)
			.addField("Nickname", nickname, true)
			.addField("Roles", member.roles.map(role => `<@&${role.id}>`).join(', '), true)
			.addField("Joined At", `${time(member.joinedAt).format('ll')} (${time(member.joinedAt).fromNow()})`, true)
			.addField("Account Created", `${time(user.createdAt).format('ll')} (${time(user.createdAt).fromNow()})`, true)
			.setColor(client.color.basic('blue'));
		return message.channel.send(embed);

	},
};