const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    TextInputBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ChannelType,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embedbuilder")
        .setDescription("Envia un embed personalizado")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addChannelOption((option) =>
            option
                .setName(`canal`)
                .setDescription(`Canal donde enviar el embed`)
                .addChannelTypes(ChannelType.GuildText)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const c = interaction.options.getChannel(`canal`);

        let channel;

        if (c) {
            channel = c.id;
        } else {
            channel = "0";
        }

        const modal = new ModalBuilder()
            .setCustomId(`embedbuilder-${channel}`)
            .setTitle(`Embed Builder`);

        const textinput = new TextInputBuilder()
            .setCustomId(`embedtitulo`)
            .setLabel(`Titulo`)
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(256);

        const textinput2 = new TextInputBuilder()
            .setCustomId(`embeddecripcion`)
            .setLabel(`Descripcion`)
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(4000);

        const textinput3 = new TextInputBuilder()
            .setCustomId(`embedimagen`)
            .setLabel(`Imagen`)
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(256);

        const textinput6 = new TextInputBuilder()
            .setCustomId(`embedthumbnail`)
            .setLabel(`Thumbnail`)
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(256);

        const textinput5 = new TextInputBuilder()
            .setCustomId(`embedfooter`)
            .setLabel(`Footer`)
            .setRequired(false)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(2048);

        modal.addComponents(
            new ActionRowBuilder().addComponents(textinput),
            new ActionRowBuilder().addComponents(textinput2),
            new ActionRowBuilder().addComponents(textinput3),
            new ActionRowBuilder().addComponents(textinput5),
            new ActionRowBuilder().addComponents(textinput6)
        );

        await interaction.showModal(modal);
    },
};
