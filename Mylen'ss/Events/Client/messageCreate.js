const { execute } = require("./ready");
const GuildSettings = require('../../Schemas/GuildSettings');

module.exports = {
  name: "messageCreate",
  async execute(message, client) {

    const guildId = message.guild.id;


    const settings = await GuildSettings.findOne({ guildId: guildId });


    const prefix = settings ? settings.prefix : '!';

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd =
      client.prefixs.get(command) ||
      client.prefixs.find((cmd) => command.aliases && cmd.aliases.includes(command));

    if (!cmd) return;

    cmd.execute(message, args);
  },
};
