const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates and exports schema for the reminders
const reminderSchema = new Schema({
    content: String,
    time: Date,
    email: String
});

module.exports = Reminder = mongoose.model('reminders', reminderSchema);
