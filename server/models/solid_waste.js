const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    type: String,
    amount: Number
})

const modelName = 'waste_dataa';
module.exports = mongoose.models[modelName] || mongoose.model(modelName, UserSchema);