const { SlashCommandBuilder } = require('@discordjs/builders');
const restrictedUsers = require("../../../blackList/page1")
const { EmbedBuilder } = require('discord.js');
const figlet = require('figlet');
const generator = require("generate-password");
import("node-fetch");
const config = require("../../../config.json")
const { createCanvas, loadImage } = require('canvas');
const Discord = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Convierte texto a ASCII')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ascii')
                .setDescription('Comando divertido para convertir texto a ASCII')
                .addStringOption(option =>
                    option.setName('text')
                        .setDescription('El texto que se convertirá en ASCII')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('dino')
                .setDescription('Otro subcomando para hacer algo más')

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('gif')
                .setDescription('Otro subcomando para hacer algo más')
                .addStringOption(option =>
                    option.setName("text")
                        .setDescription("Nombre del gif")
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("hack")
                .setDescription("Hackerear a un usuario")
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('El usuario a hackear')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("randomtoken")
                .setDescription("Obten token de discord fake")

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("worldclock")
                .setDescription("Obten la hora de todo el mundo"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("countdown")
                .setDescription("Mira cuantos días faltan para navidad")),



    async execute(interaction) {

        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción. , ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }



        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'ascii') {
            const msg = interaction.options.getString('text');

            if (msg.length > 2000) {
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setDescription('Proporcione un texto de menos de 2000 caracteres');

                return interaction.reply({ embeds: [embed] });
            }

            figlet.text(msg, function (err, data) {
                if (err) {
                    const errorEmbed = new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('Algo salió mal');

                    return interaction.reply({ embeds: [errorEmbed] });
                }

                const asciiEmbed = new EmbedBuilder()
                    .setTitle('ASCII')
                    .setDescription(`\`\`\`${data}\`\`\``)
                    .setColor('Random')
                    .setTimestamp()

                return interaction.reply({ embeds: [asciiEmbed] });
            });
        } else if (subcommand === 'dino') {
            let msg = await interaction.reply({
                content: `---------------🦖`,
                fetchReply: true,
            });
            let time = 1 * 1000;
            setTimeout(async function () {
                await msg.edit(`-----------🦖----`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`----------🦖------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`--------🦖--------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`------🦖-----------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`-------🦖-----------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`---🌵-----🦖---------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`---🌵-🦖-------------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`🦖\n ---🌵--------------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`------🦖---🌵--------------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`----🦖-----🌵----------------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`-🌵🌵-----🦖-------🌵--------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`----🌵🌵-🦖----------🌵------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`🦖\n ---🌵🌵-------------🌵---`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`-----🦖---🌵🌵-------------🌵--`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`-------🦖-----🌵🌵-------------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`🎂----🦖--------🌵🌵-----------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(`---🎂--🦖----------🌵🌵---------`);
            }, time);
            time += 1.5 * 1000;

            setTimeout(async function () {
                await msg.edit(
                    `**MISION COMPLETADA!**\n\n ---🎂🦖----------🌵🌵-------------`
                );
            }, time);
        }
        if (subcommand === 'gif') {
            const msg = interaction.options.getString('text');

            if (!msg) {
                console.error('No se proporcionó ningún texto.');
                return;
            }

            var giphy = require('giphy-api')(config.GIPHY_TOKEN);

            giphy.random(msg, function (err, res) {
                const { data } = res;
                if (data) {
                    const embed = new EmbedBuilder()
                        .setColor("Random")
                        .setTitle(`${msg} Gif`)
                        .setImage(`https://media1.giphy.com/media/${data.id}/giphy.gif`)
                        .setTimestamp()

                    interaction.reply({ embeds: [embed] });
                } else {
                    console.error('No se encontró ningún gif.');
                }
            });
        }
        if (subcommand === 'hack') {
            const password = generator.generate({
                length: 10,
                symbols: true,
                numbers: true,
            });

            const user = interaction.options.getUser("user");

            if (!user) {
                console.error('No se proporcionó ningún usuario.');
                return;
            }

            function wait(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            await interaction.reply({ content: `El hackeo a ${user} ha comenzado...` });
            await wait(140);
            const embed = new EmbedBuilder()
                .setTitle("Hacking")
                .setDescription("Búsqueda de información del usuario...")
                .setColor("Random");
            await interaction.editReply({ embeds: [embed] });
            await wait(133);
            embed.setDescription("Buscando dirección IP... (`127.0.0.1`)");
            await interaction.editReply({ embeds: [embed] });
            await wait(140);
            embed.setDescription(`Se encontró la dirección IP del usuario: \`127.0.0.1\``);
            await interaction.editReply({ embeds: [embed] });
            await wait(60);
            embed.setDescription("Buscando el inicio de sesión de Discord...");
            await interaction.editReply({ embeds: [embed] });
            await wait(230);
            embed.setDescription(`Se encontró el inicio de sesión de Discord del usuario: ${user.username}onDiscord@gmail.com, \`${password}\``);
            await interaction.editReply({ embeds: [embed] });
            await wait(200);
            embed.setDescription(`Buscando token de Discord... (token: 12345)`);
            await interaction.editReply({ embeds: [embed] });

            wait(200);
            const res = await fetch(`https://some-random-api.com/bottoken?${user.id}`).then(res => res.json()).catch(() => ({}));
            embed.setDescription(`Se encontró el token de la cuenta de Discord del usuario: \`${res.token}\``);
            await interaction.editReply({ embeds: [embed] });
            await wait(140);
            embed.setDescription(`Informe de cuenta a Discord por romper TOS...\n¡${user} fue hackeado con éxito! Toda la información del usuario ha sido enviada a tu DM.`);
            await interaction.editReply({ embeds: [embed] });
            await wait(180);
            embed.setDescription(`¡${user} fue hackeado con éxito! Toda la información del usuario ha sido enviada a tu DM.`);
            await interaction.user.send("E' broma [cnd.mylen.xyz](https://media.tenor.com/bisOlq0rDRcAAAAM/hack.gif)");
        }
        if (subcommand === 'randomtoken') {
            try {
                const res = await fetch(`https://some-random-api.com/bottoken?id=${interaction.user.id}`);
                const json = await res.json();

                const embed = new EmbedBuilder()
                    .setTitle('Random Token')
                    .setDescription(json.token)
                    .setTimestamp()
                    .setColor("Random");


                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error('Error al obtener el token aleatorio:', error);
                const errorEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Ha ocurrido un error al obtener el token aleatorio.");

                await interaction.reply({ embeds: [errorEmbed] });
            }
        }
        if (subcommand === 'worldclock') {
            var gmt = new Date().toLocaleString('en-US', { timeZone: 'Etc/GMT' });
            var pst = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
            var mst = new Date().toLocaleString('en-US', { timeZone: 'America/Denver' });
            var cst = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
            var est = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
            var bst = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
            var cet = new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' });
            var msd = new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' });
            var irt = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' });
            var ist = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
            var cstAsia = new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' });
            var jst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
            var aest = new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' });
            var nzst = new Date().toLocaleString('en-US', { timeZone: 'Pacific/Auckland' });

            const embed = new EmbedBuilder()
                .setTitle('Reloj Mundial')
                .setColor("Random")
                .setTimestamp()
                .addFields(
                    { name: ':flag_gb: GMT', value: `${gmt}`, inline: true },
                    { name: ':flag_us: PST', value: `${pst}`, inline: true },
                    { name: ':flag_ca: MST', value: `${mst}`, inline: true },
                    { name: ':flag_us: CST', value: `${cst}`, inline: true },
                    { name: ':flag_us: EST', value: `${est}`, inline: true },
                    { name: ':flag_gb: BST', value: `${bst}`, inline: true },
                    { name: ':flag_fr: CET', value: `${cet}`, inline: true },
                    { name: ':flag_ru: MSD', value: `${msd}`, inline: true },
                    { name: ':flag_ir: IRT', value: `${irt}`, inline: true },
                    { name: ':flag_in: IST', value: `${ist}`, inline: true },
                    { name: ':flag_cn: CST (Asia)', value: `${cstAsia}`, inline: true },
                    { name: ':flag_jp: JST', value: `${jst}`, inline: true },
                    { name: ':flag_au: AEST', value: `${aest}`, inline: true },
                    { name: ':flag_nz: NZST', value: `${nzst}`, inline: true }
                );

            await interaction.reply({ embeds: [embed] });
        } if (subcommand === 'cleverrate') {
            let today = new Date();
            let xmas = new Date(today.getFullYear(), 11, 24);
            if (today.getMonth() == 11 && today.getDate() > 24) {
                xmas.setFullYear(xmas.getFullYear() + 1);
            }
            let one_day = 1000 * 60 * 60 * 24;
            let daysleft = Math.ceil((xmas.getTime() - today.getTime()) / one_day);
            let days = daysleft + 1;

            const embed = new EmbedBuilder()
                .setColor("Random")
                .setDescription(`Faltan **${days}** días para Navidad`)


            await interaction.reply({ embeds: [embed] });
        }
    }
}