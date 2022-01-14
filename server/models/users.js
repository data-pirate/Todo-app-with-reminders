const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: String,
    picture: String,
    email: String
})
module.exports = User = mongoose.model("users", userSchema);