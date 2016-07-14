var mongoose = require('mongoose');
var todoListSchema = mongoose.Schema({
    title: String,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }],
});

module.exports = mongoose.model('todoLists', todoListSchema);
