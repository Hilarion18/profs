const Todo = require('../models/todo')
const convertDate = require('../helpers/convertDate')

module.exports = {
  findAll: function(req,res) {
    console.log(`findAll ===== ini req `+req.headers);
    
    console.log(`findAll ===== ini user Id`,req.data);
    Todo.find({postBy: req.data.userId})
    // .sort([['createdAt', 'descending']])
    .populate("postBy")
      .then((todo) => {
        // console.log(`====== ini list todo `+todo);
        
        res.status(200).json({
          todo,
          message: `All todo has been found`
        })
      })
      .catch((err) => {
        res.status(500).json({
          err,
          message: `All todo can't be found`
        })
      })
  },

  insert: function(req,res) {
    // console.log(`ini sebelum req body date `+req.body.date);
    // console.log(`ini setelah new date `+new Date(req.body.date));
    console.log(`insert ===== masuk sini insert req `+String(req));
    console.log(`insert ===== masuk sini insert req headers `, req.headers);
    console.log(`insert ===== masuk sini insert req data `, req.data.userId);
    console.log(`insert ===== masuk sini insert req data `, req.body.id);
    
    let dataTodo = new Todo({
      date: new Date(req.body.date),
      title: req.body.title,
      description: req.body.description,
      checklist: false,
      contentFilled: true,
      postBy: req.data.userId
    })
    console.log(`ini date todo `+dataTodo.date);
    console.log(`ini req.body.date `+req.body.date);
    console.log(`ini req.dataTodo `, dataTodo);
    
    dataTodo.date = convertDate(dataTodo.date)
    dataTodo.save()
      .then((dataTodo) => {
        console.log(`masuk insert cont `+dataTodo);
        res.status(201).json({
          dataTodo,
          message: `Todo has been added`
        })
      })
      .catch((err) => {
        console.log(`masuk catch insert cont `+err);
        res.status(500).json({
          err,
          message: `Todo can't be created`
        })
      })
  },

  update: (req,res) => {
    console.log(`update ===== masuk update server`);
    
      Todo.updateOne(
          { _id: req.params.id},
          { 
              date: req.body.date,
              title: req.body.title,
              description: req.body.description,
          },   
      )
      .then((todo) => {
        console.log(`dapet update todo `+todo);
        
          // Todo.findOne({ _id: req.params.id})
          // .then((result) => {
              res.status(200).json({
                  todo,
                  message: `Todo detail has been updated`
              })
          // })
      })
      .catch((err) => {
        console.log(`ga dapet update, err `+err);
        
          res.status(500).json({
              message: `failed updating Todo detail`
          })
      })
  },

  remove: (req,res) => {
      Todo.findOne({ _id: req.params.id})
      .then((todo) => {
        console.log(`masuk remove todo nih `+todo);
        console.log(`ini params id remove `+req.params.id);
        
          Todo.deleteOne({_id: req.params.id})
          .then((result) => {
              res.status(200).json({
                  result,
                  message: `Todo detail has been deleted`
              })
          })
      })
      .catch((err) => {
          res.status(500).json({
            err,
              message: `Todo failed to delete`
          })
      })
  },
}