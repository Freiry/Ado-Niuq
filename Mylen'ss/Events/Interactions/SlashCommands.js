const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return interaction.reply({
          content: "Mis desarrolladoras están ajustando algo, permiteme un momento porfavor",
          ephemeral: true,
        });
      if (command.developer && interaction.user.id !== "228671235519676417")
        return interaction.reply({
          content: "Este comando es solo para el desarrollador",
          ephemeral: true,
        });

      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const buttonId = interaction.customId.split("_");
      const button = client.buttons.get(buttonId[0]);
      if (!button) return;
      button.execute(interaction, client, buttonId.slice(1));
    } else {
      return;
    }
  },
};
