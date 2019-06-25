const Event = (event) => require(`../events/${event}`);

module.exports = (client) => {
	client.on('ready', () => { Event('ready')(client); });
	client.on('message', (message) => { Event('message')(client, message); });
	// client.on('guildCreate', (guild) => { Event('guildCreate')(client, guild); });
	// client.on('guildDelete', (guild) => { Event('guildDelete')(client, guild); });
	// client.on('guildMemberAdd', (member) => { Event('guildMemberAdd')(client, member); });
	// client.on('guildMemberRemove', (member) => { Event('guildMemberRemove')(client, member); });
	// client.on('messageReactionAdd', (reaction, user) => { Event('messageReactionAdd')(client, reaction, user); });
	// client.on('messageReactionRemove', (reaction, user) => { Event('messageReactionRemove')(client, reaction, user); });
};