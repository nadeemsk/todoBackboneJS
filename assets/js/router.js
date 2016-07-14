var AppRouter = Backbone.Router.extend({
  TodoListCollection: null,
  addList: null,

  routes: {
    "todos": "todos",
    "todos/:id": "todo",
    "*actions": "default"
  },

  initialize: function() {
    this.TodoListCollection = new TodoListCollectionView({
      el: $('#app'),
      model: TodoLists,
    });

    this.addList = new AddListView();
  },

  todos: function() {

  },

  todo: function (id) {

  },

  default: function (actions) {

  },
});

var router = new AppRouter();

Backbone.history.start();
