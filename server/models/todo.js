var mongoose = require('mongoose');
var todoSchema = mongoose.Schema({
    text: String,
    editing: Boolean,
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'todoList' },
    done: Boolean,
});

module.exports = mongoose.model('todos', todoSchema);
