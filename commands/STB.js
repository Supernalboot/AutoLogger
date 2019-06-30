
module.exports = {
    name: 'STB',
    info: 'String To Binary',
    desc: 'turns String to Binary code format',
    aliases: ['stb'],
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
        // String to Binary command
        function stringToBinary(str, spaceSeparatedOctets) {
            function zeroPad(num) {
                return "00000000".slice(String(num).length) + num;
            }

            return str.replace(/[\s\S]/g, function (str) {
                str = zeroPad(str.charCodeAt().toString(2));
                return !1 == spaceSeparatedOctets ? str : str + " ";
            });
        };

        return message.channel.send(stringToBinary(args.join(' ')));
    },
};