module.exports = {
	name: 'say',
	info: 'Make the bot say something',
	desc: 'Makes the bot saying anything you want',
	aliases: [],
	usage: '[What the bot shall say]',
	args: true,
	guildOnly: false,
	ownerOnly: true,
	group: 'owner',
	perm: 'ANY',
	perms: ['SEND_MESSAGES'],
	cooldown: 1,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		if (message.deletable) message.delete();
		message.channel.send(args.join(' '));
	},
};