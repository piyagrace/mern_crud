const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    year: Number,
    month: String,
    wastetype: String,
    quantity: Number
})

const modelName = 'waste_data';
module.exports = mongoose.models[modelName] || mongoose.model(modelName, UserSchema);