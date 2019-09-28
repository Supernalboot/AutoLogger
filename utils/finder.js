/*
 * Copyright (C) 2019  Joshua McCrystal
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Joshua McCrystal <joshua.mccrystal@hotmail.com>, 28/03/2019
*/

module.exports = class Finder {

	async user(query, client) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!query) reject(new ReferenceError('No search query defined'));
				else if (!client) reject(new ReferenceError('No client defined'));
				let user;
				if (!isNaN(query.replace(/[<@!>]/g, ''))) user = await client.users.get(query.replace(/[<@!>]/g, ''));
				if (!user) user = await client.users.find(u => u.tag.toLowerCase() === query.toLowerCase()) || await client.users.find(u => u.tag.toLowerCase().includes(query.toLowerCase()));
				if (user) resolve(user);
				else resolve(undefined);
			}
			catch (error) {
				reject(error);
			}
		});
	}

	async guild(query, client) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!query) reject(new ReferenceError('No search query defined'));
				else if (!client) reject(new ReferenceError('No client defined'));
				let guild;
				if (!isNaN(query)) guild = await client.guilds.get(query);
				if (!guild) guild = await client.guilds.find(g => g.name.toLowerCase() === query.toLowerCase()) || await client.guilds.find(g => g.name.toLowerCase().includes(query.toLowerCase()));
				if (guild) resolve(guild);
				else resolve(undefined);
			}
			catch (error) {
				reject(error);
			}
		});
	}

	async member(query, guild) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!query) reject(new ReferenceError('No search query defined'));
				else if (!guild) reject(new ReferenceError('No guild defined'));
				let member;
				if (!isNaN(query.replace(/[<@!>]/g, ''))) member = await guild.members.get(query.replace(/[<@!>]/g, ''));
				if (!member) member = await guild.members.find(m => m.displayName.toLowerCase() === query.toLowerCase()) || await guild.members.find(m => m.user.tag.toLowerCase() === query.toLowerCase());
				if (!member) member = await guild.members.find(m => m.displayName.toLowerCase().includes(query.toLowerCase())) || await guild.members.find(m => m.user.tag.toLowerCase().includes(query.toLowerCase()));
				if (member) resolve(member);
				else resolve(undefined);
			}
			catch (error) {
				reject(error);
			}
		});
	}

	async channel(query, guild) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!query) reject(new ReferenceError('No search query defined'));
				else if (!guild) reject(new ReferenceError('No guild defined'));
				let channel;
				if (!isNaN(query.replace(/[<#>]/g, ''))) channel = await guild.channels.get(query.replace(/[<#>]/g, ''));
				if (!channel) channel = await guild.channels.find(c => c.name.toLowerCase() === query.toLowerCase()) || await guild.channels.find(c => c.name.toLowerCase().includes(query.toLowerCase()));
				if (channel) resolve(channel);
				else resolve(undefined);
			}
			catch (error) {
				reject(error);
			}
		});
	}

	async role(query, guild) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!query) reject(new ReferenceError('No search query defined'));
				else if (!guild) reject(new ReferenceError('No guild defined'));
				let role;
				if (!isNaN(query.replace(/[<&>]/g, ''))) role = await guild.roles.get(query.replace(/[<&>]/g, ''));
				if (!role) role = await guild.roles.find(c => c.name.toLowerCase() === query.toLowerCase()) || await guild.roles.find(c => c.name.toLowerCase().includes(query.toLowerCase()));
				if (role) resolve(role);
				else resolve(undefined);
			}
			catch (error) {
				reject(error);
			}
		});
	}
};