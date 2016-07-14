var AddListView = Backbone.View.extend({

  el: $('.add-list'),
  tagName: 'div',

  events: {
    'click button': 'addList',
  },

  initialize: function() {
    this.render();
  },

  addList: function() {
    var newList = new TodoListModel({
      title: 'Set New Title',
      todos: [],
    });

    newList.save().done(function() {
      TodoLists.add(newList);
      var newListView = new TodoListView({
        model: newList,
      });
      $('#app').append(newListView.render().el);
    });

  },

  render: function() {
    this.$el.html('<button>Add List</button>');
    return this;
  }

});
