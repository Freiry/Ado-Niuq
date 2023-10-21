const { SlashCommandBuilder } = require('@discordjs/builders');
const restrictedUsers = require("../../blackList/page1")
const { EmbedBuilder, Embed } = require('discord.js');
const pop = require("popcat-wrapper");
const weather = require("weather-js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Realiza búsquedas en diferentes motores y plataformas.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('bing')
                .setDescription('Realiza una búsqueda en Bing.')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('El término que deseas buscar en Bing.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ddg')
                .setDescription('Realiza una búsqueda en duckduckgo.')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('El término que deseas buscar en duckduckgo.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('github')
                .setDescription('Obtenga información sobre un usuario de github simplemente ingresando su nombre de usuario')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Ingrese un nombre de github')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('google')
                .setDescription('Encuentra algo en Google')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Su nombre de búsqueda')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('itunes')
                .setDescription('Busca una música en Itunes')
                .addStringOption(option =>
                    option.setName('song')
                        .setDescription('Su nombre de búsqueda')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('npm')
                .setDescription('Encuentra algo en Google')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Su nombre de búsqueda')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weather')
                .setDescription('Encuentra algo en Google')
                .addStringOption(option =>
                    option.setName('location')
                        .setDescription('Su nombre de búsqueda')
                        .setRequired(true))
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
        if (subcommand === 'bing') {
            try {
                let name = encodeURIComponent(interaction.options.getString("query"));
                let link = `https://www.bing.com/search?q=${name}`;

                const bingEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Mylen Search 🔎")
                    .setFooter({ text: `Microsoft Bing` })
                    .setImage("https://cdn.discordapp.com/attachments/1163612534415310928/1163612710173421578/Bing_Fluent_Logo_Text.png")
                    .setDescription(`**He encontrado lo siguiente para**\n ${name}\n\n**Link**\n[VER LA BÚSQUEDA DE BING](${link})`, true);

                await interaction.reply({ embeds: [bingEmbed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "Ocurrió un error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.", ephemeral: true });
            }
        } else if (subcommand === 'ddg') {
            try {
                let name = encodeURIComponent(interaction.options.getString("query"));
                let link = `https://duckduckgo.com/?q=${name}`;

                const ddgEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Mylen Search 🔎")
                    .setFooter({ text: `DuckDuckGo, Inc.` })
                    .setImage("https://cdn.discordapp.com/attachments/1163612534415310928/1163624295491194930/Is_duckDuckGo_safe_hero-1024x501.png")
                    .setDescription(`**He encontrado lo siguiente para**\n ${name}\n\n**Link**\n[VER LA BÚSQUEDA DE DuckDuckGo](${link})`, true);

                await interaction.reply({ embeds: [ddgEmbed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "Ocurrió un error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.", ephemeral: true });
            }
        } else if (subcommand == 'github') {
            try {
                let name = interaction.options.getString('name');

                const userInfo = await pop.github(name)

                const gitEmbed = new EmbedBuilder()
                    .setDescription(`### **[${userInfo.name}](${userInfo.url})** \n\n ${userInfo.bio}`)
                    .setAuthor({
                        name: "Github",
                        iconURL:
                            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                    })
                    .setThumbnail(`${userInfo.avatar}`)
                    .addFields(
                        {
                            name: "👤 Nombre",
                            value: userInfo.name || "No especificado",
                            inline: true,
                        },
                        {
                            name: "🌎 Localización",
                            value: userInfo.location || "Desconocida",
                            inline: true,
                        },
                        {
                            name: "🏬 Empresa",
                            value: userInfo.company || "Sin empresa",
                            inline: true,
                        },
                        {
                            name: "📦 Repositorios",
                            value: userInfo.public_repos || 0,
                            inline: true,
                        },
                        {
                            name: "💕 Seguidores",
                            value: userInfo.followers || 0,
                            inline: true,
                        },
                        {
                            name: "💞 Seguidos",
                            value: userInfo.following || 0,
                            inline: true,
                        },
                        {
                            name: "⌚ Registrado en",
                            value: `<t:${Math.round(new Date(userInfo.created_at).getTime() / 1000)}>`,
                            inline: true,
                        }
                    )
                    .setTimestamp();

                await interaction.reply({ embeds: [gitEmbed] });

            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "Ocurrió un error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.", ephemeral: true });
            }

        } else if (subcommand == 'google') {
            try {
                let name = encodeURIComponent(interaction.options.getString('name'));
                let link = `https://www.google.com/search?q=${name}`;

                const googleEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Mylen Search 🔎")
                    .setImage("https://cdn.discordapp.com/attachments/1163612534415310928/1163654222303211540/stay-and-play-at-home-with-popular-past-google-doodles-halloween.png")
                    .setFooter({ text: `Google, Inc.` })
                    .setDescription(`He encontrado lo siguiente para\n${name}\n\n**Link**\n[VER LA BÚSQUEDA DE Google](${link})`, true)

                    .setTimestamp();

                await interaction.reply({ embeds: [googleEmbed] });

            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "Ocurrió un error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.", ephemeral: true });
            }
        } else if (subcommand === 'itunes') {
            const song = interaction.options.getString('song');

            try {
                const result = await pop.itunes(song);

                const tunesEmbed = new EmbedBuilder()
                    .setTitle(result.name)
                    .setColor("Random")
                    .setThumbnail(result.thumbnail)
                    .setURL(result.url)
                    .addFields(
                        { name: '👤 Nombre', value: result.name, inline: true },
                        { name: '🎵 Artista', value: result.artist, inline: true },
                        { name: '💿 Álbum', value: result.album, inline: true },
                        { name: '⌚ Duración', value: result.length, inline: true },
                        { name: '♀️♂️Género', value: result.genre, inline: true },
                        { name: '💸 Precio', value: result.price, inline: true },
                        {
                            name: '📅 Fecha de lanzamiento',
                            value: `<t:${Math.round(new Date(result.release_date).getTime() / 1000)}>`,
                            inline: true,
                        }
                    );

                await interaction.reply({ embeds: [tunesEmbed] });
            } catch (error) {
                return interaction.reply({ content: "Canción no encontrada. Por favor, inténtalo de nuevo.", ephemeral: true });
            }
        } else if (subcommand === 'npm') {
            const name = interaction.options.getString('name');

            try {
                const result = await pop.npm(name);

                const npmEmbed = new EmbedBuilder()
                    .setTitle(`${result.name}`)
                    .setColor("Random")
                    .addFields(
                        { name: '👤 Nombre', value: result.name, inline: true },
                        { name: '🆙 Versión', value: result.version, inline: true },
                        { name: '💭 Descripción', value: result.description, inline: true },
                        { name: 'Palabras clave', value: result.keywords, inline: true },
                        { name: '👤 Autor', value: result.author, inline: true },
                        { name: 'Descargas', value: result.downloads_this_year, inline: true },
                        {
                            name: 'Última publicación',
                            value: `<t:${Math.round(new Date(result.last_published).getTime() / 1000)}>`,
                            inline: true,
                        }
                    );

                await interaction.reply({ embeds: [npmEmbed] });
            } catch (error) {
                return interaction.reply('Paquete no encontrado. Por favor, inténtalo de nuevo.');
            }

        } if (subcommand === 'weather') {
            const country = interaction.options.getString("location");

            const findWeather = (country) => {
                return new Promise((resolve, reject) => {
                    weather.find({ search: country, degreeType: "C" }, function (error, result) {
                        if (error || result === undefined || result.length === 0) {
                            reject("Locación inválida");
                        } else {
                            resolve(result);
                        }
                    });
                });
            };

            try {
                const result = await findWeather(country);
                var current = result[0].current;
                var location = result[0].location;

                const embed = new EmbedBuilder()
                    .setTitle(`Clima - ${current.skytext}`)
                    .setColor("Random")
                    .setDescription(`Pronóstico del tiempo para ${current.observationpoint}`)
                    .setThumbnail(current.imageUrl)
                    .addFields(
                        { name: "Zona horaria", value: `UTC${location.timezone}`, inline: true },
                        { name: "Tipo de estudios", value: `Celsius`, inline: true },
                        { name: "Temperatura", value: `${current.temperature}°`, inline: true },
                        { name: "Viento", value: `${current.winddisplay}`, inline: true },
                        { name: "Se siente como", value: `${current.feelslike}°`, inline: true },
                        { name: "Humedad", value: `${current.humidity}%`, inline: true }
                    );

                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "Ocurrió un error al buscar el clima. Por favor, inténtalo de nuevo más tarde.", ephemeral: true });
            }
        }

    }
}