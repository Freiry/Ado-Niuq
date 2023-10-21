const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

const restrictedUsers = require("../../../blackList/page1")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Te respondere a tus preguntas")
        .addStringOption((option) =>
            option
                .setName(`pregunta`)
                .setDescription(`Describe tu pregunta`)
                .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const user = restrictedUsers.find(user => user.id === interaction.user.id);
        if (user) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción.  ${user.username}.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const pregunta = interaction.options.getString(`pregunta`);

        let respuestas = [
            "Sí, definitivamente",
            "Es probable",
            "No cuentes con ello",
            "Mejor no te lo digo ahora",
            "Concentra y vuelve a preguntar",
            "No puedo predecirlo en este momento",
            "Parece prometedor",
            "Muy dudoso",
            "Sin duda",
            "No",
            "Por supuesto",
            "Es decididamente así",
            "Sí, en su debido momento",
            "Las perspectivas son buenas",
            "Respuesta confusa, inténtalo de nuevo",
            "No lo veo bien",
            "Debes confiar en ello",
            "Responderé después",
            "No puedo responder en este momento",
            "Es mejor que no te lo diga",
            "Todo apunta a que sí",
            "Las señales apuntan a que no",
            "Pregunta de nuevo más tarde",
            "No puedo preverlo ahora",
            "Es improbable",
            "Respuesta nebulosa, intenta de nuevo",
            "Sí, pero necesitas esforzarte",
            "No está claro en este momento",
            "No me cuentes con ello",
            "Absolutamente seguro",
            "No apostaría por ello",
            "Es posible, pero complicado",
            "¡Por supuesto que sí!",
            "No lo contaré",
            "Es una posibilidad real",
            "Es poco probable",
            "Sí, en el momento oportuno",
            "No puedo dar una respuesta clara en este momento",
            "Las perspectivas no son buenas",
            "Es muy posible",
            "Las circunstancias apuntan hacia ello",
            "No cuentes con eso",
            "No parece probable en este momento",
            "Las estrellas no están alineadas para eso",
            "Definitivamente, sí",
            "Es difícil predecir en este momento",
            "No lo apostaría",
            "Las posibilidades son altas",
            "De ninguna manera",
            "Todo indica que sí",
            "No te emociones demasiado",
            "No lo veo sucediendo",
            "Concéntrate y pregunta de nuevo",
            "Es una posibilidad real",
            "Es mejor que no te lo diga ahora",
            "Claramente, sí",
            "Las señales son ambiguas",
            "No tengo suficiente información para responder",
            "Las perspectivas son inciertas",
            "Sí, si todo va según lo planeado",

        ];

        const respuesta = Math.floor(Math.random() * respuestas.length);

        const embed = new EmbedBuilder().addFields(
            {
                name: `Pregunta`,
                value: `${pregunta}`,
            },
            {
                name: `Respuesta`,
                value: `${respuestas[respuesta]}`
            }
        )
            .setDescription("🎱 Bola mágica de Mylen")
            .setColor("Random");

        await interaction.reply({ embeds: [embed] });
    },
};