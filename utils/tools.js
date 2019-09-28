/*
 * Copyright (C) 2019  Joshua McCrystal
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Joshua McCrystal <joshua.mccrystal@hotmail.com>, 28/03/2019
*/

const Discord = require('discord.js');
const ms = require('ms');

module.exports = class Tools {

	name(name) {
		name = name.replace(/^\w/, c => c.toUpperCase());
		return name.replace(/\s[a-z]/g, c=> c.toUpperCase());
	}

	async dataPages(data, title, message, color, client) {

		const pages = [];
		let page = 1;
		const limit = 20 * 3;

		if (data.length > limit) {
			const splits = Math.ceil(data.length / limit);
			const amnt = data.length / splits;
			if (splits > 0) pages.push(await data.slice(0, amnt));
			if (splits > 1) pages.push(await data.slice(amnt, amnt * 2));
			if (splits > 2) pages.push(await data.slice(amnt * 2, amnt * 3));
			if (splits > 3) pages.push(await data.slice(amnt * 3, amnt * 4));
			if (splits > 4) pages.push(await data.slice(amnt * 4, amnt * 5));
			if (splits > 5) pages.push(await data.slice(amnt * 5, amnt * 6));
			if (splits > 6) pages.push(await data.slice(amnt * 6, amnt * 7));
			if (splits > 7) pages.push(await data.slice(amnt * 7, amnt * 8));
			if (splits > 8) pages.push(await data.slice(amnt * 8, amnt * 9));

			message.channel.send(await client.tool.dataEmbed(pages[0], title, color, page, splits)).then(async msg => {
				await msg.react(':pokeleft:547270283162288138');
				await msg.react(':pokecircle:547270257098883082');
				msg.react(':pokeright:547270314044948490');

				const backwardsFilter = (reaction, user) => reaction.emoji.id === '547270283162288138' && user.id === message.author.id;
				const forwardsFilter = (reaction, user) => reaction.emoji.id === '547270314044948490' && user.id === message.author.id;
				const exitFilter = (reaction, user) => reaction.emoji.id === '547270257098883082' && user.id === message.author.id;

				const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
				const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
				const exit = msg.createReactionCollector(exitFilter, { time: 60000 });

				backwards.on('collect', async r => {
					r.remove(message.author.id);
					if (page === 1) return;
					page--;
					msg.edit(await client.tool.dataEmbed(pages[page - 1], title, color, page, splits));
				});

				// eslint-disable-next-line no-unused-vars
				exit.on('collect', async r => {
					msg.delete();
					return;
				});

				forwards.on('collect', async r => {
					r.remove(message.author.id);
					if (page === pages.length) return;
					page++;
					msg.edit(await client.tool.dataEmbed(pages[page - 1], title, color, page, splits));
				});
			});
		} else {message.channel.send(await client.tool.dataEmbed(data, title, color, 1, 1));}
	}

	async dataEmbed(data, title, color, page, splits) {

		let embed;
		let split;
		let data1, data2, data3;

		if (data.length > 20) {
			split = Math.ceil(data.length / 3);
			data1 = await data.slice(0, split);
			data2 = await data.slice(split, split * 2);
			data3 = await data.slice(split * 2, split * 3);
			data1 = await data1.toString().replace(/[,]/g, '');
			data2 = await data2.toString().replace(/[,]/g, '');
			data3 = await data3.toString().replace(/[,]/g, '');
			embed = new Discord.RichEmbed()
				.addField('━━━━━━━━━━━', data1, true)
				.addField(title, data2, true)
				.addField('━━━━━━━━━━━', data3, true)
				.setColor(color);
			if (splits > 1) {
				embed.setFooter(`${page} / ${splits} - - - ◄ Back || ● Delete || ► Forward`);
			}
			return embed;
		} else {embed = new Discord.RichEmbed()
			.addField(title, await data.toString().replace(/[,]/g, ''))
			.setColor(color);}
		if (splits > 1) {
			embed.setFooter(`${page} / ${splits} - - - ◄ Back || ● Delete || ► Forward`);
		}
		return embed;
	}

	time(num) {
		try {
			const time = parseInt(num);
			if (!time) return new ReferenceError('No time defined');
			if (isNaN(time)) return new ReferenceError('Time is not a number');
			const t = ms(time, { long: true });
			if (t.includes('days')) {
				const d = t.split(' ');
				const dInt = parseInt(d[0]);
				if (dInt >= '365') {
					const y = dInt / 365;
					if (y === 1) {
						return `${y.toFixed(1)} year`;
					} else { return `${y.toFixed(1)} years`; }
				} else { return t; }
			} else { return t; }
		} catch (error) { return error; }
	}

};
