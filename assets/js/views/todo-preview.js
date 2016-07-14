var TodoListPreviewView = Backbone.View.extend({

  tagName: 'div',
  className: 'todo-preview',

  events: {
    'click input.check': 'toggleDone',
  },

  template: _.template($('#todo-preview-template').html()),

  toggleDone: function(e) {
    this.model.set('done', e.target.checked);
    this.model.save();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
