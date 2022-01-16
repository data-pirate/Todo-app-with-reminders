const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for todo
const todoSchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    // array of todos to be completed
    todos: { type: Array, default: [] }
});

module.exports = Todo = mongoose.model('todos', todoSchema);
