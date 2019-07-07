module.exports = {
	name: 'removeRole',
	info: 'Remove a Role',
	desc: 'removes a mentioned users role',
	aliases: ['RR', 'rr'],
	usage: '',
	args: true,
	guildOnly: true,
	ownerOnly: false,
	group: 'server',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		// Check if the user who used this command is allowed to give people roles
		if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have manage members permission");

		// Set the member we need to give the role too
		const rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

		// triggered if no user was found
		if (!rMember) return message.reply("couldn't find that user");

		// Grab what role we want to give the user
		const role = args.slice(1).join(" ");

		// Triggered if no role was found
		if (!role) return message.reply("You didn't specify a role");

		// Find the role in the guild
		const gRole = message.guild.roles.find('name', role);

		// Triggered if no role was found
		if (!gRole) return message.reply("Couldnt find that role");

		// Triggered if user already has the role
		if (rMember.roles.has(gRole.id)) return message.reply("they already don't have that role");

		// Wait to give the user their role
		await (rMember.addRole(gRole.id));

		// Send message to the user getting the role. CATCH if the user couldnt be messaged
		try {
			message.delete().catch(O_o => { console.log(O_o); });
			await message.channel.send(`${rMember} has had role \`${gRole.name}\` removed.`);
			return;
		} catch (e) {
			console.log(e);
		}
	},
};