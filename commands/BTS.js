module.exports = {
    name: 'BTS',
    info: 'Binary To String',
    desc: 'turns Binary code to String format',
    aliases: ['bts'],
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
        // Binary to string
        function binaryToString(str) {
            // Removes the spaces from the binary string
            str = str.replace(/\s+/g, '');
            // Pretty (correct) print binary (add a space every 8 characters)
            str = str.match(/.{1,8}/g).join(" ");

            const newBinary = str.split(" ");
            const binaryCode = [];

            for (i = 0; i < newBinary.length; i++) {
                binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
            }

            return binaryCode.join("");
        }

        return message.channel.send(binaryToString(args.join(' ')));
    },
};

