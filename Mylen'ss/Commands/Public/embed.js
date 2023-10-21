const {
    ApplicationCommandOptionType,
    ChannelType,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
} = require("discord.js");
const restrictedUsers = require("../../blackList/page1")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Crear un embed en un canal específico")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("create")
                .setDescription("Crea un embed en el canal especificado")
                .addChannelOption((option) =>
                    option
                        .setName("canal")
                        .setDescription("Selecciona un canal")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {

        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción. , ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }


        const subcommand = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("canal");

        if (!channel) {
            return interaction.reply("Por favor, selecciona un canal válido.");
        }

        if (!channel.permissionsFor(interaction.client.user).has("EMBED_LINKS")) {
            return interaction.reply(
                "No tengo permiso para enviar embeds en ese canal."
            );
        }

        await interaction.deferReply();

        interaction.followUp(`Inicio de configuración del embed en ${channel}`);
        await embedSetup(channel, interaction.member);
    },
};

async function embedSetup(channel, member) {
    if (!channel) {
        return;
    }

    const sentMsg = await channel.send({
        content: "Haz clic en el botón de abajo para comenzar",
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("EMBED_ADD")
                    .setLabel("Crear Embed")
                    .setStyle(ButtonStyle.Primary)
            ),
        ],
    });

    const btnInteraction = await channel
        .awaitMessageComponent({
            componentType: ComponentType.Button,
            filter: (i) =>
                i.customId === "EMBED_ADD" &&
                i.member.id === member.id &&
                i.message.id === sentMsg.id,
            time: 20000,
        })
        .catch((ex) => { });

    if (!btnInteraction)
        return sentMsg.edit({ content: "No se recibió respuesta", components: [] });

    await btnInteraction.showModal(
        new ModalBuilder({
            customId: "EMBED_MODAL",
            title: "Generador de Embeds",
            components: [
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("title")
                        .setLabel("Título del Embed")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("description")
                        .setLabel("Descripción del Embed")
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("thumbnail")
                        .setLabel("URL de la miniatura del Embed")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("centerImage")
                        .setLabel("URL de la imagen centrada")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("footer")
                        .setLabel("Pie de página del Embed")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(false)
                ),
            ],
        })
    );

    const modal = await btnInteraction
        .awaitModalSubmit({
            time: 1 * 60 * 1000,
            filter: (m) =>
                m.customId === "EMBED_MODAL" &&
                m.member.id === member.id &&
                m.message.id === sentMsg.id,
        })
        .catch((ex) => { });

    if (!modal)
        return sentMsg.edit({
            content: "No se recibió respuesta, cancelando configuración",
            components: [],
        });

    modal.reply({ content: "Embed enviado", ephemeral: true }).catch((ex) => { });

    const title = modal.fields.getTextInputValue("title");
    const description = modal.fields.getTextInputValue("description");
    const footer = modal.fields.getTextInputValue("footer");
    const thumbnail = modal.fields.getTextInputValue("thumbnail");
    const centerImage = modal.fields.getTextInputValue("centerImage");

    if (!title && !description && !footer)
        return sentMsg.edit({
            content: "No puedes enviar un embed vacío.",
            components: [],
        });

    const embed = new EmbedBuilder();
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (footer) embed.setFooter({ text: footer });
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (centerImage) embed.setImage(centerImage);

    const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("EMBED_FIELD_ADD")
            .setLabel("Añadir Campo")
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("EMBED_FIELD_REM")
            .setLabel("Eliminar Campo")
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId("EMBED_FIELD_DONE")
            .setLabel("Listo")
            .setStyle(ButtonStyle.Primary)
    );

    await sentMsg.edit({
        content:
            "Por favor, agrega campos usando los botones a continuación. Haz clic en 'Listo' cuando hayas terminado.",
        embeds: [embed],
        components: [buttonRow],
    });

    const collector = channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter: (i) => i.member.id === member.id,
        message: sentMsg,
        idle: 5 * 60 * 1000,
    });

    collector.on("collect", async (interaction) => {
        if (interaction.customId === "EMBED_FIELD_ADD") {
            await interaction.showModal(
                new ModalBuilder({
                    customId: "EMBED_ADD_FIELD_MODAL",
                    title: "Añadir Campo",
                    components: [
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId("name")
                                .setLabel("Nombre del Campo")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId("value")
                                .setLabel("Valor del Campo")
                                .setStyle(TextInputStyle.Paragraph)
                                .setRequired(true)
                        ),
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId("inline")
                                .setLabel("En línea (true/false)")
                                .setStyle(TextInputStyle.Short)
                                .setValue("true")
                                .setRequired(true)
                        ),
                    ],
                })
            );

            const modal = await interaction
                .awaitModalSubmit({
                    time: 5 * 60 * 1000,
                    filter: (m) =>
                        m.customId === "EMBED_ADD_FIELD_MODAL" && m.member.id === member.id,
                })
                .catch((ex) => { });

            if (!modal) return sentMsg.edit({ components: [] });

            modal
                .reply({ content: "Campo añadido", ephemeral: true })
                .catch((ex) => { });

            const name = modal.fields.getTextInputValue("name");
            const value = modal.fields.getTextInputValue("value");
            let inline = modal.fields.getTextInputValue("inline").toLowerCase();

            if (inline === "true") inline = true;
            else if (inline === "false") inline = false;
            else inline = true;

            const fields = embed.data.fields || [];
            fields.push({ name, value, inline });
            embed.setFields(fields);
        } else if (interaction.customId === "EMBED_FIELD_REM") {
            const fields = embed.data.fields;
            if (fields) {
                fields.pop();
                embed.setFields(fields);
                interaction.reply({ content: "Campo eliminado", ephemeral: true });
            } else {
                interaction.reply({
                    content: "No hay campos para eliminar",
                    ephemeral: true,
                });
            }
        } else if (interaction.customId === "EMBED_FIELD_DONE") {
            return collector.stop();
        }

        await sentMsg.edit({ embeds: [embed] });
    });

    collector.on("end", async (_collected, _reason) => {
        await sentMsg.edit({ content: "", components: [] });
    });
}
