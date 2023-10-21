const { loadCommands } = require("../../Handlers/commandHandler");
const { loadPrefixs } = require("../../Handlers/prefixHandler");
const { ActivityType } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Conectado como ${client.user.username}`);

    await mongoose.connect(config.mongopass, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log("El bot se ha conectado a la base de datos");
    }

    const status = [

      {
        name: "Tu Servidor discord.gg/jGmqaNGyP5",
        type: ActivityType.Watching,
      },
      {
        name: "Con ChatGPT discord.gg/jGmqaNGyP5",
        type: ActivityType.Competing,
      },
      {
        name: "Mylen discord.gg/discord.gg/jGmqaNGyP5",
        type: ActivityType.Streaming,
        url: "https://www.twitch.tv/elmariana",
      },
      {
        name: "Ado",
        type: ActivityType.Listening,
      },
      {
        name: "Create by ado",
        type: ActivityType.Playing,
      },
    ];

    let currentIndex = 0;

    function setNextStatus() {
      const currentStatus = status[currentIndex];
      client.user.setPresence({
        activities: [currentStatus],
        status: "online",
      }); // Esto son los Online "online", Ocupado "dnd", Ausente "idle", Invisible "invisible"

      currentIndex = (currentIndex + 1) % status.length;
    }

    setNextStatus();

    const duration = 60 * 1000; // Esto indica que cada estado dura 1 minuto
    const changeInterval = 30 * 1000; // Esto indica cambia los estado cafa  duran 30 segundos

    setInterval(setNextStatus, changeInterval); // Cambia el estado cada 30 segundos
    setInterval(setNextStatus, duration); // Reinicia el estado cada 1 minuto

    loadCommands(client);
    loadPrefixs(client);
  },
};
