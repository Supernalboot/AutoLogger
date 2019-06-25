module.exports = {
	name: 'name',
	info: 'info about command',
	desc: 'longer version info for help command here',
	aliases: ['aliases'],
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
			.addField("Full Username", target.tag)
			.addField("Nickname", nickname)
			.addField("ID", target.id)
			.addField("Roles", "<UNDEFINED>")
			.addField("Created At", target.createdAt)
			.addField("Joined At", guildTarget.joinedAt);

		message.channel.send(embed);
	},
};