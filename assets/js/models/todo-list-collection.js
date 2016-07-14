
// A collection of todo lists
var TodoListCollection = Backbone.Collection.extend({
  model: TodoListModel,
  url: baseURL + 'todoLists',
});

var TodoLists = new TodoListCollection();
