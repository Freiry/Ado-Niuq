const { SlashCommandBuilder } = require('@discordjs/builders');
const restrictedUsers = require("../../blackList/page1")
const { MessageEmbed, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../config.json');


const blockedSchema = new mongoose.Schema({
    userId: { type: String, required: true },
});

const BlockedUser = mongoose.models.BlockedUser || mongoose.model('BlockedUser', blockedSchema);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('block')
        .setDescription('Añade o elimina a un miembro de tu lista de bloqueados.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Bloquea a un usuario en el servidor.')
                .addUserOption(option =>
                    option.setName('usuario')
                        .setDescription('El usuario que deseas bloquear')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Desbloquea a un usuario en el servidor.')
                .addUserOption(option =>
                    option.setName('usuario')
                        .setDescription('El usuario que deseas desbloquear')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Muestra la lista de usuarios bloqueados.')
        ),
    async execute(interaction) {

        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción. , ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }


        if (interaction.options.getSubcommand() === 'add') {
            const user = interaction.options.getUser('usuario');
            try {
                const blockedUser = await BlockedUser.findOne({ userId: user.id });

                if (blockedUser) {
                    await interaction.reply({ content: `${user.username} ya está en tu lista de bloqueados.`, ephemeral: true });
                } else {
                    const newBlockedUser = new BlockedUser({ userId: user.id });
                    await newBlockedUser.save();

                    const embed = new EmbedBuilder()
                        .setDescription(`${user.username} ha sido añadido a tu lista de bloqueados.`)
                        .setColor("Green");

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (error) {
                console.error('Error al bloquear usuario:', error);
                await interaction.reply({ content: 'Hubo un error al procesar tu solicitud.', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() === 'remove') {
            const user = interaction.options.getUser('usuario');
            try {
                const blockedUser = await BlockedUser.findOne({ userId: user.id });

                if (!blockedUser) {
                    await interaction.reply({ content: `${user.username} no está en tu lista de bloqueados.`, ephemeral: true });
                } else {
                    await BlockedUser.deleteOne({ userId: user.id });

                    const embed = new EmbedBuilder()
                        .setDescription(`${user.username} ha sido eliminado de tu lista de bloqueados.`)
                        .setColor("Red");

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (error) {
                console.error('Error al desbloquear usuario:', error);
                await interaction.reply({ content: 'Hubo un error al procesar tu solicitud.', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() === 'list') {
            const userId = interaction.user.id;

            try {
                const blockedUsers = await BlockedUser.find();
                console.log(blockedUsers);

                if (blockedUsers.length === 0) {
                    await interaction.reply({ content: 'No has bloqueado a ningún usuario todavía.', ephemeral: true });
                } else {
                    let blockedList = 'Lista de usuarios bloqueados:\n';
                    for (let i = 0; i < blockedUsers.length; i++) {
                        const user = await interaction.client.users.fetch(blockedUsers[i].userId);
                        blockedList += `\`${i + 1}.\` ${user.toString()} (ID: ${user.id})\n`;
                    }

                    const embed = new EmbedBuilder()
                        .setTitle('Usuarios Bloqueados')
                        .setDescription(blockedList)
                        .setColor("Random");

                    await interaction.reply({ embeds: [embed] });
                }
            } catch (error) {
                console.error('Error al obtener la lista de usuarios bloqueados:', error);
                await interaction.reply({ content: 'Hubo un error al procesar tu solicitud.', ephemeral: true });
            }
        }
    }
}
