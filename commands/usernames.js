const Discord = require('discord.js');

module.exports = {
    name: 'usernames',
    info: 'Get history of available usernames',
    desc: 'Shows the history of names changes for a member of the guild',
    aliases: ['names'],
    usage: '[ID / @Mention / Name]',
    args: true,
    guildOnly: true,
    ownerOnly: false,
    group: 'moderation',
    perm: 'ADMINISTRATOR',
    perms: ['SEND_MESSAGES'],
    cooldown: 3,

    /** - - Code to Run - - */
    async execute(client, message) {
		if (message.deletable) message.delete();

		// Set Variables
		let user; let member
		if (args[0]) member = await client.find.member(args.join(" "), message.guild); else member = message.member; user = member.user;
		if (!user) return;
		let nickname = member.nickname;
        if (!nickname) nickname = "No guild nickname.";
        
        // Get usernames
        let usernames = [];
        await client.knex.from('userdata').where('userid', user.id).select('usernames').then(async function(output) {
            if (output[0]) usernames = JSON.parse(output[0].usernames);
        });
        if (!usernames.length) usernames = ["No username history"]

        // Send embed
        const embed = new Discord.RichEmbed()
            .setTitle(`This is **${user.tag}**'s username history`)
            .setThumbnail(user.avatarURL)
            .addField("Current Username", target.tag, true)
            .addField("ID", target.id, true)
            .addField("Nickname", nickname, true)
            .addField("Username History", usernames.join("\n"))
            .setColor(client.color.basic('blue'));
        return message.channel.send(embed);

    },
};