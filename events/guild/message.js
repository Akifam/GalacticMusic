const config = require('../../config.json');

module.exports = (Discord, client, message) => {
    const prefix = config.prefix;
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!command) return;
    else 
    try{
    command.execute(message, args, cmd, client, Discord);
} catch (err){
     console.log(err);
  return message.reply('There was an error trying to execute this command!');
    }
}