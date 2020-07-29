/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
module.exports = async (client) => {
	client.user.setPresence({ game: { name: 'with the restart switch!' }, status: 'dnd' });
	console.log(`INFO) ${client.user.tag} is ready to serve ${client.guilds.size} guilds and ${client.users.size} users!`);
	// Generate Invite Link
	const invLink = await client.generateInvite(['ADMINISTRATOR']);
	console.log(`INFO) ${invLink}`);
	// Set New Activity
	client.user.setActivity('Hackweek June 2019 🎉', { type: 'WATCHING' });
	client.user.setPresence({ status: 'online' });
};