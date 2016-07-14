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
    console.log(this.$el.children('.title').children('.title-edit'));
    this.$el.children('.title').children('p').hide();
    this.$el.children('.title').children('.title-edit').show();
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
        this.$el.children('.title').children('p').show();
        this.$el.children('.title').children('.title-edit').hide();
        this.renderTitle(text);
      }
    }else if(!e.keyCode){
      this.$el.children('.title').children('p').show();
      this.$el.children('.title').children('.title-edit').hide();
    }
  },

  renderTitle: function(title) {
    this.$el.children('.title').children('p').html(title);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    var that = this,
    todos = this.model.attributes.todos;
    var t1 = {"todos":[{"_id":"5784a3508aea5f117c8119b6","listId":"5784a3448aea5f117c8119b5","text":"shapoo","editing":false,"done":true,"__v":0},{"_id":"5784a3548aea5f117c8119b7","listId":"5784a3448aea5f117c8119b5","text":"bucket","editing":false,"done":true,"__v":0},{"_id":"5784a35f8aea5f117c8119b8","listId":"5784a3448aea5f117c8119b5","text":"spoons","editing":false,"done":false,"__v":0},{"_id":"5784a3638aea5f117c8119b9","listId":"5784a3448aea5f117c8119b5","text":"pillows","editing":false,"done":false,"__v":0},{"_id":"5784c7da9097f43684d2253f","listId":"5784a3448aea5f117c8119b5","text":"Another none do","editing":false,"done":false,"__v":0}]};

    var context = $.ajax({
      url: baseURL + 'todos',
      data: { todos: todos },
      type: 'GET',
    });

    context.done(function(data) {
      for (var i = 0; i < data.todos.length; i++) {
        var model = data.todos[i];
        var newTodo = new TodoModel(model);
        var newTodoView = new TodoView({
          model: newTodo,
        });

        that.$el.children('.todos').append(newTodoView.render().el);
      }
    });
    return that;
  }

});
