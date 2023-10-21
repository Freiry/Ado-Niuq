const anime = require("anime-actions");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const restrictedUsers = require("../../blackList/page1")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("act")
    .setDescription("Interactua con otro miembro.")
    .addSubcommand((command) =>
      command
        .setName("kiss")
        .setDescription("Dale un beso a un miembro.")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona a quien quieres besar.")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("kill")
        .setDescription("Asesina a un miembro.")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona a quien quieres asesinar.")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName("sad").setDescription("Imagen triste")
    )
    .addSubcommand((command) =>
      command
        .setName("slap")
        .setDescription("Golpear a un miembro.")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona a quien quieres golpear")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("hug")
        .setDescription("Dar un brazaro a un miembro.")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona a quien quieres abrazar")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("highfive")
        .setDescription("choca los cinco con un mimebro.")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona con quien quieres chocar los cicno.")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName("dance").setDescription("bailar.")
    )
    .addSubcommand((command) =>
      command.setName("bored").setDescription("Aburrirse.")
    )
    .addSubcommand((command) =>
      command.setName("sonrojarse").setDescription("sonrjarse.")
    )
    .addSubcommand((command) =>
      command
        .setName("bonk")
        .setDescription("Golpea a un miembro con el bate.")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona a quien quieres golpear")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("kick")
        .setDescription("Patea a un mimebro")
        .addUserOption((option) =>
          option
            .setName(`miembro`)
            .setDescription("Menciona con quien quieres chocar los cicno.")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName("cringe").setDescription("Muesta la imagen de una waifu")
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
        .setDescription(`Lamento informarte que no puedes interactuar conmigo en este momento debido a una sanción. , ${user.username}.`);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }


    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "kiss":
        try {
          const url = await anime.kiss();
          const member = interaction.options.getMember(`miembro`);
          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** Le dio un beso a **${member.user.username}**.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "kill":
        try {
          const url = await anime.kill();
          const member = interaction.options.getMember(`miembro`);
          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** Asesino a **${member.user.username}**.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "sad":
        try {
          const url = await anime.sad();

          const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user.username}** esta sad trsite.`)
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "slap":
        try {
          const url = await anime.slap();
          const member = interaction.options.getMember(`miembro`);
          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** Le ha pegado a **${member.user.username}**.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "hug":
        try {
          const url = await anime.hug();
          const member = interaction.options.getMember(`miembro`);
          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** Le dio un abrazo a **${member.user.username}**.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "highfive":
        try {
          const url = await anime.highfive();
          const member = interaction.options.getMember(`miembro`);

          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** choco los 5 con ${member}.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) { }
        break;

      case "dance":
        try {
          const url = await anime.dance();

          const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user.username}** está bailando.`)
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "bored":
        try {
          const url = await anime.bored();

          const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user.username}** está aburrido.`)
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "sonrojarse":
        try {
          const url = await anime.blush();
          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** Se ha sonrrojado.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "bonk":
        try {
          const url = await anime.bonk();
          const member = interaction.options.getMember(`miembro`);
          const embed = new EmbedBuilder()
            .setDescription(
              `**${interaction.user.username}** Le ha pegado en la cabeza a **${member.user.username}**.`
            )
            .setColor("Random")
            .setImage(url);

          interaction.reply({ embeds: [embed] });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "kick":
        try {
          fetch("https://api.waifu.pics/sfw/kick")
            .then((res) => res.json())
            .then((json) => {
              const url = json.url;
              const memberOption = interaction.options.getMember("miembro");
              const memberName = memberOption.user.username;
              const embed = new EmbedBuilder()
                .setColor("Random")
                .setDescription(
                  `**${interaction.user.username}** Le dio una patada a **${memberName}**`
                )
                .setImage(url);
              interaction.reply({ embeds: [embed] });
            });
        } catch (error) {
          interaction.reply(error);
        }
        break;

      case "cringe":
        try {
          fetch("https://api.waifu.pics/sfw/cringe")
            .then((res) => res.json())
            .then((json) => {
              const url = json.url;
              const embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Le dio cringe`)
                .setImage(url);
              interaction.reply({ embeds: [embed] });
            });
        } catch (error) {
          interaction.reply(error);
        }
        break;
    }
  },
};
