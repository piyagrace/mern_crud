const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const modelName = 'users';
module.exports = mongoose.models[modelName] || mongoose.model(modelName, UserSchema);