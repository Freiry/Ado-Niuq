const { SlashCommandBuilder } = require('@discordjs/builders');
const restrictedUsers = require("../../blackList/page1")
const Schema = require('../../Schemas/birthday');
const { EmbedBuilder } = require('discord.js'); // Cambié EmbedBuilder a MessageEmbed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Comando para administrar el cumpleaños')
        .addSubcommand(subcommand =>
            subcommand
                .setName('date')
                .setDescription('Establece tu cumpleaños')
                .addIntegerOption(option =>
                    option.setName('dia')
                        .setDescription('El día de tu cumpleaños')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('mes')
                        .setDescription('El mes de tu cumpleaños')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Edita tu cumpleaños previamente establecido')
                .addIntegerOption(option =>
                    option.setName('dia')
                        .setDescription('El nuevo día de tu cumpleaños')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('mes')
                        .setDescription('El nuevo mes de tu cumpleaños')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Muestra la lista de cumpleaños en el servidor'))


        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Quita tu cumpleaños')

        ),

    async execute(interaction) {

        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción. , ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }


        function suffixes(number) {
            const converted = number.toString();
            const lastChar = converted.charAt(converted.length - 1);

            if (lastChar === "1" && converted !== "11") return `${converted}`;
            if (lastChar === "2" && converted !== "12") return `${converted}`;
            if (lastChar === "3" && converted !== "13") return `${converted}`;

            return `${converted}`;
        }


        if (interaction.options.getSubcommand() === 'date') {
            const months = {
                1: "Enero",
                2: "Febrero",
                3: "Marzo",
                4: "Abril",
                5: "Mayo",
                6: "Junio",
                7: "Julio",
                8: "Agosto",
                9: "Septiembre",
                10: "Octubre",
                11: "Noviembre",
                12: "Diciembre",
            };

            const dia = interaction.options.getInteger("dia");
            const mes = interaction.options.getInteger("mes");

            if (!dia || dia > 31 || dia < 1) {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Formato de día equivocado");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!mes || mes > 12 || mes < 1) {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Formato de mes incorrecto");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const convertedDay = suffixes(dia);
            const convertedMonth = months[mes];
            const birthdayString = `${convertedDay} de ${convertedMonth}`;

            try {
                let data = await Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
                if (data) {
                    const previousBirthday = data.Birthday;
                    const embed = new EmbedBuilder()
                        .setDescription(`Ya tienes un cumpleaños establecido **${previousBirthday}**`)
                        .setColor("Red");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    data = new Schema({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Birthday: birthdayString,
                    });

                    await data.save();

                    const embed = new EmbedBuilder()
                        .setColor("Green")
                        .setDescription(`El cumpleaños se ha establecido con éxito **${birthdayString}**`)
                        ;

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (err) {
                console.error(err);
            }
        } else if (interaction.options.getSubcommand() === 'edit') {
            const months = {
                1: "Enero",
                2: "Febrero",
                3: "Marzo",
                4: "Abril",
                5: "Mayo",
                6: "Junio",
                7: "Julio",
                8: "Agosto",
                9: "Septiembre",
                10: "Octubre",
                11: "Noviembre",
                12: "Diciembre",
            };

            const dia = interaction.options.getInteger("dia");
            const mes = interaction.options.getInteger("mes");

            if (!dia || dia > 31 || dia < 1) {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Formato de día equivocado");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!mes || mes > 12 || mes < 1) {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Formato de mes incorrecto");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            const convertedDay = suffixes(dia);
            const convertedMonth = months[mes];
            const birthdayString = `${convertedDay} de ${convertedMonth}`;

            try {
                let data = await Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
                if (data) {
                    const previousBirthday = data.Birthday;
                    data.Birthday = birthdayString;

                    await data.save();

                    const embed = new EmbedBuilder()
                        .setDescription(`Tu cumpleaños se ha actualizado de **${previousBirthday}** a **${birthdayString}**`)
                        .setColor("Green");

                    return interaction.reply({ embeds: [embed] });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor("Red")
                        .setDescription("Aún no has establecido tu cumpleaños. Usa el comando **/birthday date** para hacerlo.");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (err) {
                console.error(err);
            }
        } else if (interaction.options.getSubcommand() === 'remove') {
            try {
                const data = await Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id });
                if (data) {
                    const embed = new EmbedBuilder()
                        .setColor("Green")
                        .setDescription("Tu cumpleaños ha sido eliminado con éxito.");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor("Red")
                        .setDescription("No se ha encontrado un cumpleaños para eliminar.");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (err) {
                console.error(err);
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Ha ocurrido un error al intentar eliminar el cumpleaños.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } if (interaction.options.getSubcommand() === 'list') {
            const rawBirthdayboard = await Schema.find({ Guild: interaction.guild.id });

            if (rawBirthdayboard.length < 1) {
                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setDescription('No se ha encontrado ningún cumpleaños');

                return interaction.reply({ embeds: [embed] });
            }

            const lb = rawBirthdayboard.map(
                (e) =>
                    `🎂 | **<@!${e.User}>** - ${e.Birthday} `
            );

            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle(`Cumpleaños del servidor - ${interaction.guild.name} 🎂`)
                .setDescription(lb.join('\n'));

            return interaction.reply({ embeds: [embed] });
        }
    }
};

