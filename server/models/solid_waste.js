const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    type: String,
    amount: Number
})

const UserModel2 = mongoose.model("waste_data", UserSchema)
module.exports = UserModel2