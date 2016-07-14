var TodoListView = Backbone.View.extend({

  tagName: 'div',
  className: 'todoList',

  template: _.template($('#todo-list-template').html()),

  events: {
    'keydown input.add-todo': 'addTodo',
    'dblclick .title': 'editTitle',
    'focusout .title-edit': 'setTitle',
    'keydown input.title-edit': 'setTitle',
  },

  addTodo: function(e) {
    if ((e.which == 13 || e.keyCode == 13)) {
      if (e.target.className == 'add-todo') {
        var listId = e.target.getAttribute('listid');
        var text = e.target.value;
        e.target.value = '';

        console.log('Adding todo "' + text + '" to list ' + listId);
        var newTodo = new TodoModel({
          text: text,
          listId: listId,
        });

        var that = this;
        newTodo.save()
        .done(function() {
          var todos = that.model.get('todos');
          console.log(todos);
          console.log(newTodo.get('_id'));
          todos.push(newTodo.get('_id'));
          that.model.set('todos', todos);
          that.model.save().done(function() {
            that.render();
            e.target.focus();
          });
        });
      }
    }
  },

  editTitle: function() {
    var id = this.model.id;
    var el = document.getElementById('title-' + id);
    el.innerHTML = '<input type="text" class="title-edit" listid="' +
      id + '" id="list-title-edit-' + id + '"/>';
    document.getElementById('list-title-edit-' + id).focus();
  },

  setTitle: function(e) {
    if ((e.which == 13 || e.keyCode == 13)) {
      if (e.target.className == 'title-edit') {
        var listId = e.target.getAttribute('listid');
        var text = e.target.value;
        e.target.value = '';

        if (!text) {
          return;
        }
        console.log('Setting new title "' + text + '" for list ' + listId);
        this.model.set('title', text);
        this.model.save();
        this.render();
      }
    }else if(!e.keyCode){
      this.render();
    }
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    var that = this;

    this.model.attributes.todos.forEach(function(model) {
      Todos.fetch({data: { id: model }}).done(function(data) {
        var newTodo = new TodoModel(data);
        var newTodoView = new TodoView({
          model: newTodo,
        });

        that.$el.children('.todos').append(newTodoView.render().el);
      });
    }.bind(this));

    return that;
  }

});
