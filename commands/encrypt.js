// Grab our Required Modules
CryptoJS = require('crypto-js');
Discord = require('discord.js');

module.exports = {
	name: 'encrypt',
	info: 'Encrypt a message',
	desc: 'Encrypt a message with a pass code to send to other users',
	aliases: ['encry'],
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

		// Send messaging asking for message to encrypt
		const start = await message.channel.send('**Ready to encrypt!** What message would you like to encrypt?\n*Just type it out and send it in this channel*');
		// Await a reply
		msgs = await message.channel.awaitMessages(reply => reply.author.id === message.author.id, { max: 1, time: 60000 });
		// Save msg in a variable
		const msg = msgs.first().content;
		// Delete original messages
		msgs.first().delete();
		start.delete();

		// Send messaging asking for the key to encryption
		const end = await message.channel.send('**Got it!** What is the key to this message?\n*Key can be any ASCII characters up to 32 long. e.g. 143fg34h5g2 or secret 50 key*');
		// Await a reply
		codes = await message.channel.awaitMessages(reply => reply.author.id === message.author.id, { max: 1, time: 60000 });
		// Save msg in a variable
		const code = codes.first().content;
		// Delete original message
		codes.first().delete();
		end.delete();

		// Encrypt our message
		const encryption = CryptoJS.AES.encrypt(msg, code);

		// Create our discord embed
		const embed = new Discord.RichEmbed()
			.setTitle('Message Encryption')
			.setDescription(`**Original Message**\n${msg}`)
			.addField('Encrypted Message', encryption)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setColor(client.color.basic('yellow'));

		// Send our Encrypted message
		return message.channel.send(embed);
	},
};