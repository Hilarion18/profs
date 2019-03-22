const Todo = require("../models/todo")

function authTodo (req,res,next) {

  Todo.findOne({_id : req.params.id})
    .populate('postBy')
    .then(function (todo) {
      if (String(todo.postBy._id) == String(req.userId)) {
        next()
      } else {
        res.status(500).json({
          message : `access danied`
        })
      }

    })
    .catch(function () {
      res.status(500).json({
        message : `access danied`
      })
    })
}

module.exports = authTodo