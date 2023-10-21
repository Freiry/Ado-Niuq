const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const restrictedUsers = require("../../blackList/page1")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Mira la información o avatar de un miembro.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Revisa toda la información de un miembro en este servidor.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('El miembro del cual quieres ver la información')
                        .setRequired(false)
                )
        ),
    async execute(interaction, client, args) {
        const restrictedUser = restrictedUsers.find(user => user.id === interaction.user.id);
        if (restrictedUser) {
            const embed = new EmbedBuilder()  // haces fun si te alcanza hay que hacerlo diferente y saca ejem de corwins

                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción.  ${restrictedUser.username}.`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const subcommand = interaction.options.getSubcommand();
        let user = interaction.options.getUser('user') || interaction.user;

        switch (subcommand) {
            case 'info':
                try {
                    const member = await interaction.guild.members.fetch(user.id);
                    const roles = member.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(role => role)
                        .join(', ');
                    const banner = await (await interaction.client.users.fetch(user.id, { force: true })).bannerURL({ size: 4096 });
                    const userFlags = user.flags.toArray();
                    const badges = {
                        DISCORD_EMPLOYEE: 'Discord Employee',
                        DISCORD_PARTNER: 'Discord Partner',
                        BUGHUNTER_LEVEL_1: 'Bug Hunter Level 1',
                        BUGHUNTER_LEVEL_2: 'Bug Hunter Level 2',
                        HYPESQUAD_EVENTS: 'HypeSquad Events',
                        HOUSE_BRAVERY: 'House of Bravery',
                        HOUSE_BRILLIANCE: 'House of Brilliance',
                        HOUSE_BALANCE: 'House of Balance',
                        EARLY_SUPPORTER: 'Early Supporter',
                        TEAM_USER: 'Team User',
                    };
                    const userBadges = userFlags.length ? userFlags.map(flag => badges[flag]).join(', ') : 'Ninguna';

                    const embed = new EmbedBuilder()
                        .setColor(member.displayHexColor)
                        .setThumbnail(member.displayAvatarURL())
                        .setDescription(
                            `### [**${member.displayName}**](https://discord.com/users/${member.id})\n\n` +
                            `**ID:** ${member.id}\n` +
                            `**Usuario:** ${member.user.tag}\n` +
                            `**Nombre:** ${member.displayName}\n` +
                            `**Color:** ${member.displayHexColor}\n` +
                            `**Insignias:** ${userBadges}\n` +
                            `**Roles:** ${roles}\n` +
                            `**Miembro del servidor:** (<t:${Math.floor(member.joinedAt / 1000)}:R>)\n` +
                            `**Miembro de Discord:** (<t:${Math.floor(user.createdAt / 1000)}:R>)`
                        );

                    const buttons = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("avatar")
                            .setLabel("Mirar avatar")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("banner")
                            .setLabel("Mirar banner")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("perms")
                            .setLabel("Mirar permisos")
                            .setStyle(ButtonStyle.Primary)
                    );

                    await interaction.reply({
                        embeds: [embed],
                        components: [buttons] // Usamos [buttons] en lugar de [userOptions]
                    });

                    const collector = interaction.channel.createMessageComponentCollector({
                        componentType: ComponentType.Button,
                        filter: (i) => i.user.id === interaction.user.id,
                        idle: 5000,
                    });

                    collector.on("collect", async (buttonInteraction) => {
                        if (buttonInteraction.customId === "avatar") {


                            try {
                                const user = interaction.options.getUser('user') || interaction.user;
                                const avatarEmbed = new EmbedBuilder()
                                    .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
                                    .setTitle(`Avatar de ${user.username}`)
                                    .setColor('Random') // Corrección: usar 'RANDOM' en lugar de 'Random'
                                    .setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
                                    .setTimestamp()
                                    .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() });

                                // Responder con el nuevo embed de manera efímera (visible solo para el usuario que hizo clic en el botón)
                                buttonInteraction.reply({ embeds: [avatarEmbed], ephemeral: true });
                            } catch (error) {
                                console.error(error);
                            }
                        } else if (buttonInteraction.customId === "banner") {
                            try {
                                const user = interaction.options.getUser('user') || interaction.user;
                                const member = await interaction.guild.members.fetch(user.id);
                                const banner = await (await interaction.client.users.fetch(user.id, { force: true })).bannerURL({ size: 4096 });

                                const bannerEmbed = new EmbedBuilder()
                                    .setColor('Random') // Corrección: usar 'RANDOM' en lugar de 'Random'
                                    .setAuthor({ name: `${user.tag}`, iconURL: member.displayAvatarURL() })
                                    .addFields({ name: `Banner de ${user.tag}`, value: banner ? " " : "No tiene banner" })
                                    .setImage(banner)
                                    .setTimestamp()
                                    .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() });

                                // Responder con el nuevo embed de manera efímera (visible solo para el usuario que hizo clic en el botón)
                                buttonInteraction.reply({ embeds: [bannerEmbed], ephemeral: true });
                            } catch (error) {
                                console.error(error);
                            }
                        } else if (buttonInteraction.customId === "perms") {
                            try {
                                const user = interaction.options.getUser('user') || interaction.user;
                                const member = await interaction.guild.members.fetch(user.id);

                                // Obtener la lista de permisos del miembro en el servidor
                                const permissions = member.permissions.toArray().map(perm => `✓ ${perm}`).join('\n');

                                const permsEmbed = new EmbedBuilder()
                                    .setColor('Random')
                                    .setAuthor({ name: `${user.tag}`, iconURL: member.displayAvatarURL() })
                                    .setTitle(`Permisos de ${user.tag}`)
                                    .setDescription(`**Permisos:**\n\`\`\`yaml\n${permissions}\`\`\``)
                                    .setTimestamp()
                                    .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() });

                                // Responder con el nuevo embed de manera efímera (visible solo para el usuario que hizo clic en el botón)
                                buttonInteraction.reply({ embeds: [permsEmbed], ephemeral: true });
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    });

                    collector.on("end", (_collected, reason) => {
                        if (reason === "time") {
                            // La colección de botones ha expirado
                            interaction.followUp("La solicitud ha expirado.");
                        }
                    });

                } catch (error) {
                    console.error(error);
                    interaction.reply({ content: 'Ha ocurrido un error al obtener la información del usuario.', ephemeral: true });
                }
                break;
        }
    }
};
