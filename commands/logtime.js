module.exports = {
    name: 'logtime',
    info: 'Find the exact time of a log',
    desc: 'Find the exact time a specific log was logged',
    aliases: ['time'],
    usage: '[Message Link]',
    args: true,
    guildOnly: true,
    ownerOnly: false,
    group: 'moderation',
    perm: 'ADMINISTRATOR',
    perms: [],
    cooldown: 2,

    /** - - Code to Run - - */
    async execute(client, message, args) {
        let link;
        const regex = /https:\/\/discordapp\.com\/channels\/[0-9]+\/[0-9]+\/[0-9]+/g;
        if (regex.test(args[0]))
        {
            link = args[0]
        }
        else
        {
            return message.channel.send("Sorry, that doesn't seem to be a message link, please double check and try again.")
        }

        const messageid = link.replace(/https:\/\/discordapp\.com\/channels\/[0-9]+\/[0-9]+\//g, '');
        const channel = await client.find.channel(link.replace(/https:\/\/discordapp\.com\/channels\/[0-9]+\//g, '').split('/')[0], message.guild);
        if (!channel) return message.channel.send("Sorry, I couldn't find the channel containing this message in this server.");
        const msg = await channel.fetchMessage(messageid);
        if (!msg) return message.channel.send("Sorry, I can't seem to find the message from that link, be sure it's not deleted.");

        const embed = await new Discord.RichEmbed()
            .setDescription(`${client.tool.time(Date.now() - msg.createdTimestamp)} ago`)
            .setTimestamp(msg.createdTimestamp)
        return message.channel.send(embed)
    },
};