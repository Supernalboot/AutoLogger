module.exports = async (client, message) => {

	/** - - Command Parser - - */
	if (!message.author.bot) {
		// Prefix
		let prefix;
		if (message.guild) {
			try { await client.knex.from('guilddata').where('guildid', message.guild.id).select('prefix').then(async function(output) { prefix = await output[0].prefix; }); } catch (err) { prefix = 'o!'; }
		} else { prefix = ''; }
		// Global Variables
		let command;
		let args;
		let commandName;
		let msgArray = [];
		// Check for DM
		if (message.channel.type === 'dm') {
			msgArray = message.content.split(/ +/);
			commandName = msgArray[0];
			command = client.commands.get(commandName.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases == commandName.toLowerCase());
			if (!command) return;
			args = msgArray.slice(1);
			// Send to Command Handler
			return require('../tasks/cmd.js')(client, message, command, commandName, args, prefix);
		}
		// Check for mention
		else if (message.content.startsWith(`<@${client.user.id}>`)) {
			msgArray = message.content.split(/ +/);
			if (msgArray.length === 1) {
				command = client.commands.get('help');
				args = '';
				return require('../tasks/cmd.js')(client, message, command, commandName, args, prefix);
			}
			commandName = msgArray[1];
			command = client.commands.get(commandName.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases == commandName.toLowerCase());
			if (!command) return;
			args = msgArray.slice(2);
			// Send to Command Handler
			return require('../tasks/cmd.js')(client, message, command, commandName, args, prefix);
		}
		// Check for other mention
		else if (message.content.startsWith(`<@!${client.user.id}>`)) {
			msgArray = message.content.split(/ +/);
			if (msgArray.length === 1) {
				command = client.commands.get('help');
				args = '';
				return require('../tasks/cmd.js')(client, message, command, commandName, args, prefix);
			}
			commandName = msgArray[1];
			command = client.commands.get(commandName.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases == commandName.toLowerCase());
			if (!command) return;
			args = msgArray.slice(2);
			// Send to Command Handler
			return require('../tasks/cmd.js')(client, message, command, commandName, args, prefix);
		}
		// Check for prefix
		else if (message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
			let msg;
			if (message.content.slice(prefix.length).startsWith(' ')) msg = message.content.replace(/ +/, '');
			else msg = message.content;
			msgArray = msg.slice(prefix.length).split(/ +/);
			commandName = msgArray[0];
			command = client.commands.get(commandName.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases == commandName.toLowerCase());
			if (!command) return;
			args = msgArray.slice(1);
			// Send to Command Handler
			return require('../tasks/cmd.js')(client, message, command, commandName, args, prefix);
		}
	}

};