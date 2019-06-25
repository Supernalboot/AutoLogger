// Grab our Required Modules
CryptoJS = require('crypto-js');
Discord = require('discord.js');

module.exports = {
	name: 'decrypt',
	info: 'Decrypt a message',
	desc: 'Decrypt a message with a pass code to view content',
	aliases: ['decry'],
	usage: '',
	args: true,
	guildOnly: false,
	ownerOnly: false,
	group: 'client/moderation/server',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		// Set our values
		const cipherText = args[0];
		let passCode = args.slice(2);

		// Check if a pass code was not provided
		if (!passCode) return message.channel.send('No pass code was provided');

		// If pass code contains more then 1 word, join them
		if (passCode.length > 1) passCode = passCode.join(' ');

		// Decrypt the provided arguments
		const decryptedText = CryptoJS.AES.decrypt(cipherText, passCode);

		// Create our discord embed
		const embed = new Discord.RichEmbed()
			.setThumbnail(client.user.avatarURL)
			.setTitle('Message Encryption')
			.addBlankField()
			.addField('Decrypted Message', decryptedText)
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor();

		// Send our Encrypted message
		return message.channel.send(embed);
	},
};