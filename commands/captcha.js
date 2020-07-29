/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const svgCaptcha = require('svg-captcha');
const svg2img = require('svg2img');

module.exports = {
	name: 'captcha',
	info: 'test command',
	desc: 'test command lol',
	aliases: ['cap'],
	usage: '',
	args: false,
	guildOnly: false,
	ownerOnly: true,
	group: 'owner',
	perm: 'ADMINISTRATOR',
	perms: [],
	cooldown: 2,

	/** - - Code to Run - - */
	async execute(client, message) {

		const captcha = svgCaptcha.create();
		let img;
		svg2img(captcha.data, function(error, buffer) { img = new Discord.Attachment(buffer, 'captcha.png'); });
		return message.channel.send('This is a captcha', { Attachment: img });

	},
};