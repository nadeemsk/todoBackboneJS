
// Basic todo model, represents each entry in a todo list
var TodoModel = Backbone.Model.extend({
  defaults: {
    _id: null,
    listId: null,
    text: '',
    editing: false,
    done: false,
  },

  idAttribute: '_id',
  urlRoot: baseURL + 'todos',
});
