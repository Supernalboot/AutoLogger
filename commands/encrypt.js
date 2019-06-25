// Grab our Required Modules
CryptoJS = require('crypto-js');
Discord = require('discord.js');

module.exports = {
	name: 'encrypt',
	info: 'Encrypt a message',
	desc: 'Encrypt a message with a pass code to send to other users',
	aliases: ['encry'],
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
		let iterator = 0;
		let passCode = '';

		// Loop through our array to find our specified symbol
		for (const element of args) {
			if (element != ';') { iterator++; } else {
				// Increase our iterator again to cut out the symbol and then join the message pass code
				iterator++;
				passCode = args.slice(iterator).join(' ');
				break;
			}
		}

		// Check if a pass code is not provided
		if (!passCode) {
			return message.channel.send('No pass Code was provided! Did you separate it with a `;`?');
		}

		// A pass code was provided

		// Set our message
		const text = args.join(' ');

		// Encrypt our message
		const cipherText = CryptoJS.AES.encrypt(text, passCode);

		// Create our discord embed
		const embed = new Discord.RichEmbed()
			.setThumbnail(bot.user.avatarURL)
			.setTitle('Message Encryption')
			.addBlankField()
			.addField('Encrypted Message', cipherText)
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor();

		// Send our Encrypted message
		return message.channel.send(embed);
	},
};