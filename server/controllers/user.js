const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const checkPassword = require("../helpers/checkPassword");
const generatePassword = require("../helpers/generatePassword")
const bcryptPass = require('../helpers/bcryptPass')

module.exports = {
  findAll: function(req,res) {
    User.find({})
    .then((user) => {
      res.status(200).json({
        user,
        message: `All users has been found`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `All users can't be found`
      })
    })
  },
  login: function(req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            if (user) {
              console.log(`====== 1`);
              
            if (bcrypt.compareSync(req.body.password, user.password)) {
                jwt.sign(
                {
                    userId: user._id,
                    email: user.email
                },
                process.env.JWT_TOKEN,
                function(err, token) {
                    if (!err) {
                      console.log(`======= 2`);
                      console.log(`token `+token);
                      
                      
                    res.status(201).json({
                        id: user.id,
                        token: token,
                        score: user.score
                    });
                    } else {
                      console.log(`======= 3`);
                      
                    res.status(500).json({
                        message: `Email and password didn't match 1`
                    });
                    }
                }
                );
            } else {
              console.log(`======= 4`);
                res.status(500).json({
                message: "email and password didnt match 2"
                });
            }
            } else {

              console.log(`======= 5`);
            res.status(404).json({
                message: "you did not have account, please signup first 3"
            });
            }
        })
        .catch(err => {
          console.log(`======= 6`);
            res.status(400).json({
                message: `Something's error from our server`
            })
        });
},

register: function(req, res) {
    let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validateEmail.test(String(req.body.email).toLowerCase())) {

      console.log(`======= 1`);
       res.status(400).json({
           message: `Please use correct email format`
       })
    } else if (validateEmail.test(String(req.body.email).toLowerCase())) {

      console.log(`======= 2`);
        let dataUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        });
    
        bcryptPass(dataUser)
        dataUser.save()
        .then(user => {
          console.log(`======= 3`);
            const token = jwt.sign({user}, process.env.JWT_TOKEN)
            res.status(201).json({
            id: user.id,
            token,
            score: user.score,
            message: `registration success`
            });
        })
        .catch(err => {
          console.log(`======= 4`);
            res.status(500).json({
            err,
            message: `Email has been taken, please use another email`
            });
        });
    } 
  },

  update: function (req,res) {
    console.log('headers', req.data);
    console.log(`headers id `, req.data.userId);
    console.log(`score nih`, req.body.score);
    
    
    User.updateOne(
      { _id : req.data.userId},
      { score : req.body.score },
      { runValidators: true }
    )
    .then((user) => {
      res.status(201).json({
        user,
        message: `update user score ${req.body.score} success`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `update user score failed`
      })
    })
  },
  
  addingScore: function (req,res) {
    User.find(
      { _id : req.data.user._id},
      { score : + Number (req.body.score) },
    )
    .then((user) => {
      res.status(201).json({
        user,
        message: `update user score ${req.body.score} success`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `update user score failed`
      })
    })
  },
};
