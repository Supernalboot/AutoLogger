// Grab our Required Modules
CryptoJS = require('crypto-js');
Discord = require('discord.js');

module.exports = {
	name: 'decrypt',
	info: 'Encrypt a message',
	desc: 'decrypt a message with a pass code to view content',
	aliases: ['aliases'],
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
		const passCode = args.slice[1].join(' ');

		// Decrypt the provided arguments
		const decryptedText = CryptoJS.AES.decrypt(cipherText, passCode);

		// Create our discord embed
		const embed = new Discord.RichEmbed()
			.setThumbnail(bot.user.avatarURL)
			.setTitle('Message Encryption')
			.addBlankField()
			.addField('Decrypted Message', decryptedText)
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor();

		// Send our Encrypted message
		return message.channel.send(embed);
	},
};