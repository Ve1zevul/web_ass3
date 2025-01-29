const mongoose = require('mongoose');

const apiHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID of the user making the request
    apiName: { type: String, required: true }, // Name of the API (e.g., "PokéAPI", "Pokémon TCG API")
    requestData: { type: Object, required: true }, // User input (e.g., Pokémon name)
    responseData: { type: Object, required: true }, // API response data
    timestamp: { type: Date, default: Date.now }, // Timestamp of the request
});

module.exports = mongoose.model('ApiHistory', apiHistorySchema);