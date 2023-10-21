const { SlashCommandBuilder } = require('@discordjs/builders');
const GuildSettings = require('../../Schemas/GuildSettings');
const restrictedUsers = require("../../blackList/page1")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setprefix')
        .setDescription('Establece un nuevo prefijo para el bot')
        .addStringOption(option =>
            option.setName('prefix')
                .setDescription('El nuevo prefijo')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción. , ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const newPrefix = interaction.options.getString('prefix');
        const guildId = interaction.guild.id;

        try {
            let settings = await GuildSettings.findOne({ guildId: guildId });

            if (!settings) {
                settings = new GuildSettings({
                    guildId: guildId,
                    prefix: newPrefix,
                });
            } else {
                settings.prefix = newPrefix;
            }

            await settings.save();

            await interaction.reply(`El nuevo prefijo se ha establecido en \`${newPrefix}\``);
        } catch (error) {
            console.error('Error al establecer el prefijo:', error);
            await interaction.reply({ contente: "Ha ocurrido un error al establecer el prefijo. Por favor, intenta de nuevo más tarde.", ephemeral: true });
        }
    },
};
