/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
module.exports = {
	name: 'addRole',
	info: 'Give a Role',
	desc: 'Gives a mentioned user a role',
	aliases: ['AR', 'ar'],
	usage: [''],
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

		// Check if we can find a user
		const rMember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
		if (!rMember) return message.reply("Couldn't find that user");

		// Check for our role name
		const roleName = args.slice(1, args.length).join(' ');
		if (!roleName) return message.reply("You didn't specify a role");

		// Check if guild will allow given role
		let role;
		// Filter by name
		const result = roleArray.filter(r => r.name == roleName);

		// Grab first mentioned role
		if (result.length == 0) role = message.mentions.roles.first();

		// Check if user has role
		if (rMember.roles.cache.has(role)) return message.reply("They already have that role");

		// Check role position
		if (role.position >= message.guild.members.cache.get(client.user.id).roles.highest) return message.channel.send(`Requested role ${role} is higher then my current highest role ${message.guild.members.cache.get(client.user.id).roles.highest}. I am unable to give this user the role`);

		// Add role
		await rMember.roles.add(role);

		// Send message to the user getting the role. CATCH if the user couldn't be messaged
		try {
			message.delete().catch(O_o => console.log(O_o));
			await rMember.send(`You have been given the role \`${role.name}\` in \`${message.guild}\``);
			return message.channel.send("I have successfully given the role to the user!");
		} catch (e) {
			message.delete().catch(O_o => console.log(O_o));
			message.channel.send(`${rMember} has been given the role ${role}`);
		}
	},
};