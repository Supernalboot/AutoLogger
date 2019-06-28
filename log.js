/** - - Packages - - */
const fs = require('fs');
const Discord = require('discord.js');

/** - - Client - - */
const client = new Discord.Client({
	disableEveryone: true,
	disabledEvents: ['CLIENT_USER_GUILD_SETTINGS_UPDATE', 'CLIENT_USER_SETTINGS_UPDATE', 'GUILD_MEMBER_CHUNK', 'GUILD_MEMBER_SPEAKING', 'RESUME',
		'TYPING_START', 'TYPING_STOP', 'GUILD_SYNC', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE'],
	messageCacheMaxSize: -1,
	messageCacheLifetime: 604800,
	messageSweepInterval: 3600,
	fetchAllMembers: true,
});

/** - - Utilities - - */
const Color = require('./utils/color');
client.color = new Color();

/** - - Commands - - */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

/** - - Command Loader - - */
console.log(`> Loading ${commandFiles.length} commands...`);
let index = 0;
for (const file of commandFiles) {
	index = index + 1;
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`${index}) Loaded ${command.name} command`);
} console.log(`>>> Loaded ${commandFiles.length} commands! <<<`);

/** - - Requirements - - */
require('./tasks/events.js')(client);
const { token } = require('./config.json');

/** - - Storage - - */
client.knex = require('knex')(require('./knexfile.js')['server']);

/** - - Eval Command - - */
const clean = text => { if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));} else {return text;} };
client.on('message', async message => {
	const args = message.content.split(' ').slice(1);
	if (message.content.startsWith(';e ') && message.author.id == '200274748381462528') {
		try {
			const code = args.join(' ');
			let evaled = await eval(code);
			if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
			message.channel.send(clean(evaled), { code: 'xl' }, true);
		}
		catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	} else { return; }
});

/** - - Error Event - - */
// unhandledRejection logging
process.on('unhandledRejection', error => {
	const unhandleEmbed = new Discord.RichEmbed()
		.setAuthor('Caught an unhandledRejection')
		.setDescription(`\n\`\`\`\n${error.stack}\n\`\`\``)
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));
	client.channels.get('592948839636271104').send(unhandleEmbed);
});
// uncaught Exception logging
process.on('uncaughtException', error => {
	const uncaughtEmbed = new Discord.RichEmbed()
		.setAuthor('Caught an uncaughtException')
		.setDescription(`\n\`\`\`\n${error.stack}\n\`\`\``)
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));
	client.channels.get('592948839636271104').send(uncaughtEmbed);
});
// Error logging
client.on('error', error => {
	const errorEmbed = new Discord.RichEmbed()
		.setAuthor('Caught an Error')
		.setDescription(`\n\`\`\`\n${error.stack}\n\`\`\``)
		.setTimestamp(Date.now())
		.setColor(client.color.basic('red'));
	client.channels.get('592948839636271104').send(errorEmbed);
});

/** - - Client Login - - */
client.login(token);