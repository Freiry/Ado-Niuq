const mongoose = require('mongoose');

const guildSettingsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        default: '!',
    },

});

module.exports = mongoose.model('GuildSettings', guildSettingsSchema);
