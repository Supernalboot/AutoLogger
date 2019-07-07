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
		message.channel.send(args);
	},
};