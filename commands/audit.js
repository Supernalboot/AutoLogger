module.exports = {
	name: 'audit',
	info: 'info about command',
	desc: 'longer version info for help command here',
	aliases: ['auditlogs'],
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
		console.log(message.guild.fetchAuditLogs().entries.array.join(' '));
	},
};