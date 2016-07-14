
// A collection of todo entries
var TodoCollection = Backbone.Collection.extend({
  model: TodoModel,
  url: baseURL + 'todos',

  comparator: function(model) {
    return model.get('id');
  },
});

var Todos = new TodoCollection();
