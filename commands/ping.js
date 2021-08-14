module.exports = {
    name: 'ping',
    description: 'pings the bot',
    async execute(message, args, cmd, client, Discord){
        message.reply('Pong!');
    }
}