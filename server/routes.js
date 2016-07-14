var todoModel = require('./models/todo');
var todoListModel = require('./models/todoList');

var modelTypes = {
  TODOLISTS: 'todoLists',
  TODOS: 'todos',
};

module.exports = function(app, db) {
  app.get('/' + modelTypes.TODOLISTS + '/:id', function (req, res, next) {
    db.model(modelTypes.TODOLISTS).findById(req.params.id, function(err, list) {
      if (!list) {
        list = {};
      }

      var response = {};
      response[modelTypes.TODOLISTS] = list;
      res.send(response);
    });
  });

  app.get('/' + modelTypes.TODOLISTS, function (req, res, next) {

    db.model(modelTypes.TODOLISTS).find(function(err, lists) {
      if (!lists) {
        lists = [];
      }

      var response = {};
      response[modelTypes.TODOLISTS] = lists;
      res.send(lists);
    });
  });

  app.post('/' + modelTypes.TODOLISTS, function (req, res, next) {
    var todoList = req.body;

    delete todoList._id;

    new todoListModel(todoList).save(function(err, todoList) {
      if (err) {
        return next(err);
      }

      var response = {};
      response[modelTypes.TODOLISTS] = todoList;
      return res.send(todoList);
    });
  });

  app.put('/' + modelTypes.TODOLISTS + '/:id', function (req, res, next) {
    var data = req.body;
    data.id = req.params.id;

    var model = db.model(modelTypes.TODOLISTS),
      options = {multi: false, upsert: false},
      todos = [];

    model.findById(data.id, function(err, list) {

      var update = {
        'title': data.title,
        todos: data.todos,
      };

      model.update({_id: data.id}, update, options, function(err, num) {
        if (num.ok == 1) {
          model.findById(data.id, function(err, list) {
            var response = {};
            response[modelTypes.TODOLISTS] = list;
            return res.send(list);
          });
        }else {
          return next(err);
        }
      });
    });
  });

  app.get('/' + modelTypes.TODOS + '/:id', function (req, res, next) {
    db.model(modelTypes.TODOS).findById(req.params.id, function(err, todo) {
      if (!todo) {
        todo = {};
      }

      var response = {};
      response[modelTypes.TODOS] = todo;
      res.send(response);
    });
  });

  app.get('/' + modelTypes.TODOS, function (req, res, next) {
    if (req.query.id) {
      db.model(modelTypes.TODOS).findById(req.query.id, function(err, todo) {
        if (!todo) {
          todo = {};
        }

        var response = {};
        response[modelTypes.TODOS] = todo;
        res.send(todo);
      });
    }else if(req.query.todos){
      var todoids = req.query.todos, todos = [], count = 0;
      for (var i = 0; i < todoids.length; i++) {
        db.model(modelTypes.TODOS).findById(todoids[i], function(err, todo) {
          count ++;
          if (todo) {
            todos.push(todo);
          }

          if (todoids.length == count) {
            return res.send({todos: todos});
          }
        });
      }
    }else {
      db.model(modelTypes.TODOS).find(function(err, todos) {
        if (!todos) {
          todos = [];
        }

        var response = {};
        response[modelTypes.TODOS] = todos;
        res.send(response);
      });
    }
  });

  app.post('/' + modelTypes.TODOS, function (req, res, next) {
    var newtodo = req.body;
    delete newtodo._id;
    new todoModel(newtodo).save(function(err, todo) {
      if (err) {
        return next(err);
      }

      var model = db.model(modelTypes.TODOLISTS),
        options = {multi: false, upsert: false},
        todos = [];

      return res.send(todo);
    });
  });

  app.put('/' + modelTypes.TODOS + '/:id', function (req, res, next) {
    var data = req.body;
    data.id = req.params.id;

    var model = db.model(modelTypes.TODOS),
      options = {multi: false, upsert: false},
      todos = [];

    model.findById(data.id, function(err, list) {

      var update = {
        'done': data.done,
        'text': data.text,
      };

      model.update({_id: data.id}, update, options, function(err, num) {
        if (num.ok == 1) {
          model.findById(data.id, function(err, list) {
            var response = {};
            response[modelTypes.TODOS] = list;
            return res.send(list);
          });
        }else {
          return next(err);
        }
      });
    });
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
};
