module.exports = {
    name: 'pause',
    aliases: [],
    description: 'Pauses the music',
    async execute(message, args, cmd, client, Discord){
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply("There is no player for this guild.");
    
        const { channel } = message.member.voice;
        
        if (!channel) return message.reply("You need to join a voice channel.");
        if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
        if (player.paused) return message.reply("The player is already paused.");
    
        player.pause(true);
        return message.reply("Paused the player.");
    }
}