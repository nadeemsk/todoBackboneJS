var TodoView = Backbone.View.extend({

  tagName: 'div',
  className: 'todo',

  events: {
    'click input.check': 'toggleDone',
  },

  template: _.template($('#todo-template').html()),

  toggleDone: function(e) {
    this.model.set('done', e.target.checked);
    this.model.save();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
