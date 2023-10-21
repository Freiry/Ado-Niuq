const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const restrictedUsers = require("../../blackList/page1")
import('node-fetch')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('animals')
        .setDescription('Muestra una imagen aleatoria de un animal')
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('bunny')
        //         .setDescription('Trae una imagen aleatoria de un conejo')
        // )
        .addSubcommand(subcommand =>
            subcommand
                .setName('cat')
                .setDescription('Trae una imagen aleatoria de un gatito')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('dog')
                .setDescription('Trae una imagen aleatoria de un perrito')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('koala')
                .setDescription('Trae una imagen aleatoria de un koala')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fox')
                .setDescription('Trae una imagen aleatoria de un zorrito')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('panda')
                .setDescription('Trae una imagen aleatoria de un pandita')
        )


        .addSubcommand(subcommand =>
            subcommand
                .setName('raccoon')
                .setDescription('Trae una imagen aleatoria de un mapache')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('red-panda')
                .setDescription('Trae una imagen aleatoria de un panda rojo')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('bird')
                .setDescription('Trae una imagen aleatoria de un pájaro')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kangaroo')
                .setDescription('Trae una imagen aleatoria de una canguro')
        ),


    async execute(interaction, client, args) {

        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción.  ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }


        const subcommand = interaction.options.getSubcommand();


        switch (subcommand) {
            case 'panda':
                fetch('https://some-random-api.com/img/panda')
                    .then(res => res.json())
                    .then(async json => {
                        const pandaEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Un pequeño panda (ɔ◔‿◔)ɔ ♥")
                            .setImage(json.link);
                        await interaction.reply({ embeds: [pandaEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del conejo:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'cat':
                fetch('https://some-random-api.com/img/cat')
                    .then(res => res.json())
                    .then(async json => {
                        const catEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Hermoso gatito ٩(˘◡˘)۶")
                            .setFooter({ text: `Dame mis frisky bits >:'3` })
                            .setImage(json.link);

                        await interaction.reply({ embeds: [catEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del gatito:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'dog':
                fetch('https://some-random-api.com/img/dog')
                    .then(res => res.json())
                    .then(async json => {
                        const dogEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Lindo perrito ʕ•́ᴥ•̀ʔっ")
                            .setFooter({ text: `Dame mis croquetas >:'3` })
                            .setImage(json.link);

                        await interaction.reply({ embeds: [dogEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del dog:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'bird':
                fetch('https://some-random-api.com/img/bird')
                    .then(res => res.json())
                    .then(async json => {
                        const birdEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Soy un lindo Pájarito (✿◠‿◠) ")
                            .setImage(json.link);

                        await interaction.reply({ embeds: [birdEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del Pájarito:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'fox':
                fetch('https://some-random-api.com/img/fox')
                    .then(res => res.json())
                    .then(async json => {
                        const foxEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Zorritos ᕙ(`▿´)ᕗ ")
                            .setImage(json.link);

                        await interaction.reply({ embeds: [foxEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del Zorritos:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'kangaroo':
                fetch('https://some-random-api.com/img/kangaroo')
                    .then(res => res.json())
                    .then(async json => {
                        const kangarooEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Canguroos ( ˘ ³˘)♥ ")
                            .setImage(json.link);

                        await interaction.reply({ embeds: [kangarooEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del Canguroos:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'koala':
                fetch('https://some-random-api.com/img/koala')
                    .then(res => res.json())
                    .then(async json => {
                        const koalaEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Koalas (•̀ᴗ•́)و ̑̑")
                            .setImage(json.link);

                        await interaction.reply({ embeds: [koalaEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del koalas:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'raccoon':
                fetch('https://some-random-api.com/img/raccoon')
                    .then(res => res.json())
                    .then(async json => {
                        const raccoonEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Mapaches a la vista (っ▀¯▀)つ")
                            .setImage(json.link);

                        await interaction.reply({ embeds: [raccoonEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del Mapaches:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;

            case 'red-panda':
                fetch('https://some-random-api.com/img/red_panda')
                    .then(res => res.json())
                    .then(async json => {
                        const redpandaEmbed = new EmbedBuilder()
                            .setColor("Random")
                            .setDescription("Pequeño panda, pero rojo (๑‵●‿●‵๑)")
                            .setImage(json.link);

                        await interaction.reply({ embeds: [redpandaEmbed] });
                    })
                    .catch(async err => {
                        console.error('Error al obtener la imagen del Elefante:', err);
                        await interaction.reply({ content: 'Ocurrió un error. Mis desarrolladores están trabajando para solucionarlo.', ephemeral: true });
                    });
                break;




        }
    },
};
