const mongoose = require('mongoose');


const blockedSchema = new mongoose.Schema({
    blockedBy: { type: String, required: true },
    userId: { type: String, required: true },
});

const BlockedUser = mongoose.model('BlockedUser', blockedSchema);

module.exports = BlockedUser;
