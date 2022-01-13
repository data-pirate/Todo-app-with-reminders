const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    todos: Array,
    completed: Array
})

module.exports = mongoose.model("todos", todoSchema);
