const { MessageEmbed } = require('../index');

module.exports = {
    name: 'Queue',
    aliases: ['ListQueue'],
    description: 'Lists the queue!',
    async execute(message, args, cmd, client, Discord){
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply("There is no player for this guild.");
    
        const queue = player.queue;
        const embed = new MessageEmbed()
          .setAuthor(`Queue for ${message.guild.name}`);
    
       
        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
    
        const end = page * multiple;
        const start = end - multiple;
    
        const tracks = queue.slice(start, end);
    
        if (queue.current) embed.addField("Current", `[${queue.current.title}](${queue.current.uri})`);
    
        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));
    
        const maxPages = Math.ceil(queue.length / multiple);
    
        embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
    
        return message.reply(embed);
    }
}