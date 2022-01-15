const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
    googleId: String,
    name: String,
    picture: String,
    email: String
});

// bind find or create mondule
userSchema.plugin(findOrCreate);
module.exports = User = mongoose.model('users', userSchema);
