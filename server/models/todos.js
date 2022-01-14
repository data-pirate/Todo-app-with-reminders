const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    todos: {type: Array, default: []},
    completed: {type: Array, default: []}
})

module.exports = Todo = mongoose.model("todos", todoSchema);
