const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    year: Number,
    month: String,
    wastetype: String,
    quantity: Number
})

const UserModel3 = mongoose.model("wastedata", UserSchema)
module.exports = UserModel3