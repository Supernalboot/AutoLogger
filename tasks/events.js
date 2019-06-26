const Event = (event) => require(`../events/${event}`);

module.exports = (client) => {
	client.on('ready', () => { Event('ready')(client); });
	client.on('message', (message) => { Event('message')(client, message); });
	client.on('guildCreate', (guild) => { Event('guildCreate')(client, guild); });
	client.on('guildDelete', (guild) => { Event('guildDelete')(client, guild); });
	// client.on('guildUpdate', (oldGuild, newGuild) => { Event('guildUpdate')(client, oldGuild, newGuild); });
	// client.on('messageDelete', (message) => { Event('messageDelete')(client, message); });
	// client.on('messageUpdate', (oldMessage, newMessage) => { Event('messageUpdate')(client, oldMessage, newMessage); });
	client.on('roleCreate', (role) => { Event('roleCreate')(client, role); });
	client.on('roleDelete', (role) => { Event('roleDelete')(client, role); });
	client.on('roleUpdate', (oldRole, newRole) => { Event('roleUpdate')(client, oldRole, newRole); });
	// client.on('guildMemberAdd', (member) => { Event('guildMemberAdd')(client, member); });
	// client.on('guildMemberRemove', (member) => { Event('guildMemberRemove')(client, member); });
	// client.on('guildMemberUpdate', (oldMember, newMember) => { Event('guildMemberUpdate')(client, oldMember, newMember); });
	// client.on('guildMemberAdd', (role) => { Event('guildMemberAdd')(client, role); });
	// client.on('guildMemberRemove', (role) => { Event('guildMemberRemove')(client, role); });
	// client.on('guildMemberUpdate', (oldRole, newRole) => { Event('guildMemberUpdate')(client, oldRole, newRole); });
	// client.on('guildBanAdd', (guild, user) => { Event('guildMemberAdd')(client, guild, user); });
	// client.on('guildBanRemove', (guild, user) => { Event('guildMemberRemove')(client, guild, user); });
	// client.on('messageReactionAdd', (reaction, user) => { Event('messageReactionAdd')(client, reaction, user); });
	// client.on('messageReactionRemove', (reaction, user) => { Event('messageReactionRemove')(client, reaction, user); });
};