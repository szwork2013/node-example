var redis = require("redis"),
  client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

exports.save = function(req, res) {
  var newTodo = {};
  newTodo.name = req.body['todo-text'];
  newTodo.id = newTodo.name.replace(" ", "-");
  client.hset("Todo", newTodo.id, newTodo.name);
  res.redirect("back");
};

exports.index = function(req, res){
  var todos = [];
  client.hgetall("Todo", function(err, objs) {
    for(var k in objs) {
      var newTodo = {
        text: objs[k]
      };
      todos.push(newTodo);
    }
    res.render('index', {
      title: 'Node.js Example',
      todos: todos
    });
  });
};
