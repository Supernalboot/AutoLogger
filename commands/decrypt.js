/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
// Grab our Required Modules
const CryptoJS = require('crypto-js');
const Discord = require('discord.js');

module.exports = {
	name: 'decrypt',
	info: 'Decrypt a message',
	desc: 'Decrypt a message with a pass code to view content',
	aliases: ['decry', 'decryption'],
	usage: '',
	args: false,
	guildOnly: false,
	ownerOnly: false,
	group: 'crypto',
	perm: 'ANY',
	perms: ['SEND_MESSAGES'],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message) {
		// Delete command message if given permission
		if (message.deletable) message.delete();

		// Variables
		let msg; let code; let decryption; let decryptionBytes;

		// Send messaging asking for message to encrypt
		await message.author.send('**Ready to decrypt!** What message would you like to decrypt?\n*Just type it out and send it.*').then(async (dm) => {
			// Check if already in DMs
			if (message.channel.type === 'dm') return;
			message.reply(' I\'ve sent you a DM!');
			// Await a reply
			const msgs = await dm.channel.awaitMessages(reply => reply.author.id === message.author.id, { max: 1, time: 60000 });
			// Save msg in a variable
			msg = msgs.first().content;
			// Delete original messages
			dm.delete();

			// Send messaging asking for the key to encryption
			const end = await message.author.send('**Got it!** What is the key to this message?\n*The person who sent the message should have provided one.*');
			// Await a reply
			const codes = await dm.channel.awaitMessages(reply => reply.author.id === message.author.id, { max: 1, time: 60000 });
			// Save msg in a variable
			code = codes.first().content;
			// Delete original message
			end.delete();
		}).catch(() => {
			// If DMs fail let them know
			return message.reply(' it seems like I can\'t DM you! Do you have DMs disabled?');
		});

		// Encrypt our message
		try {
			decryptionBytes = CryptoJS.AES.decrypt(msg, code);
			// Turn the bytes into readable text
			decryption = decryptionBytes.toString(CryptoJS.enc.Utf8);

			// Create our discord embed
			const embed = new Discord.MessageEmbed()
				.addField('Decrypted Message', decryption)
				.setColor(client.color.basic('yellow'));

			// Send our Encrypted message
			return message.author.send(embed);
		} catch(err) { return message.author.send('There was a problem decrypting your message, please check the encryption and key and try again.'); }

	},
};