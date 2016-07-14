var TodoView = Backbone.View.extend({

  tagName: 'div',
  className: 'todo',

  events: {
    'click input.check': 'toggleDone',
    'dblclick span.text': 'editTodo',
    'keydown input.text-input': 'setTodo',
    'focusout .text-input': 'setTodo',
  },

  template: _.template($('#todo-template').html()),

  toggleDone: function(e) {
    this.model.set('done', e.target.checked);
    this.model.save();
  },

  editTodo: function() {
    console.log(this.$el);
    this.$el.children('.text').hide();
    this.$el.children('.text-input').show();
    this.$el.children('.text-input').focus();
  },

  setTodo: function(e) {
    if (e.keyCode == 13) {
      var text = e.target.value;
      this.model.set('text', text);
      var that = this;
      this.model.save().then(function() {
        that.$el.children('.text').show();
        that.$el.children('.text-input').hide();
        that.render();
      });
    }else if(!e.keyCode){
      this.$el.children('.text').show();
      this.$el.children('.text-input').hide();
    }
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
