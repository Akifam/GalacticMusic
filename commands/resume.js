module.exports = {
    name: 'resume',
    aliases: ['unpause'],
    description: 'Resumes the song',
    async execute(message, args, cmd, client, Discord){
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply("There is no player for this guild.");
    
        const { channel } = message.member.voice;
        
        if (!channel) return message.reply("You need to join a voice channel.");
        if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");
        if (!player.paused) return message.reply("The player is already resumed.");
    
        player.pause(false);
        return message.reply("Resumed the player.");
    }
}