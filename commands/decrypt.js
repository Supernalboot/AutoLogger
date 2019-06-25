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
	group: 'crypto',
	perm: 'ANY',
	perms: ['SEND_MESSAGES'],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message, args) {
		// Set our values
		const cipherText = args[0];
		let passCode = args.slice(2);

		// Check if a pass code was not provided
		if (!passCode) {
			// Return a message if no pass code was provided
			return message.channel.send('No pass code was provided');

		} else if (passCode.length > 1) {
			// Check if the pass code is more than one word
			passCode = passCode.join(' ');

		}
		// else just convert to a string
		else {
			passCode = passCode.toString();
		}

		// Decrypt the provided arguments
		const decryptedText = CryptoJS.AES.decrypt(cipherText, passCode);

		// Create our discord embed
		const embed = new Discord.RichEmbed()
			.setTitle('Message Decryption')
			.setDescription(`**Original Encrypted Message**\n${cipherText}`)
			.addField('Decrypted Message', decryptedText)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setColor(client.color.basic('orange'));

		// Send our Encrypted message
		return message.channel.send(embed);
	},
};