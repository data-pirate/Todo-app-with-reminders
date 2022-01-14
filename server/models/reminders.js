const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    content: String,
    time: Date
})

module.exports = Reminder = mongoose.model("reminders", reminderSchema);
