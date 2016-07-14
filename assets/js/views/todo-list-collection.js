var TodoListCollectionView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html('');
    var that = this;
    return this.model.fetch().done(function(data) {
      data.forEach(function(model) {
        // each model is a todoList
        var newList = new TodoListModel(model);
        var todolist = new TodoListView({
          model: newList,
        });

        that.$el.append(todolist.render().el);
      }.bind(that));
      return that;
    });
  }

});
