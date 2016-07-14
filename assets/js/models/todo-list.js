
// A complete entry encompassing list of todos any functionality on top of that.
var TodoListModel = Backbone.Model.extend({
  defaults: function() {
    return {
      todos: [],
      title: '',
      _id: null,
    };
  },

  idAttribute: '_id',
  urlRoot: baseURL + 'todoLists',
});

// var TodoList1 = new TodoListModel({ todos: Todos1, title: 'List 1', id: 'todo-list-1' });
// var TodoList2 = new TodoListModel({ todos: Todos2, title: 'List 2', id: 'todo-list-2' });
