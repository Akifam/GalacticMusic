const config = require('./config.json');
const { Client, Intents, Discord, Collection, MessageEmbed } = require('discord.js');
const { Manager } = require('erela.js');

module.exports = MessageEmbed;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
client.events = new Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});

client.manager = new Manager({
    nodes: [
        {
            host: 'localhost',
            port: 8000,
            password: 'passwordsecret'
        },
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
})  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
.on("trackStart", (player, track) => {
  client.channels.cache
    .get(player.textChannel)
    .send(`Now playing: ${track.title}`);
})
.on("queueEnd", (player) => {
  client.channels.cache
    .get(player.textChannel)
    .send("Queue has ended.");
  player.destroy();
});


client.login(config.token);
client.on('ready', () => {
    client.manager.init(client.user.id);
});


client.on('raw', (d) => client.manager.updateVoiceState(d));