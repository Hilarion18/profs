const GuessWord = require('../models/guessWord')

module.exports = {
  getWords: function(req,res) {
    GuessWord.find()
    .then(dataGuess => {
      res.status(200).json({
        dataGuess,
        message: `Words has been found`
      })
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: `All words can't be found`
      })
    })
  },

  getLevel: function(req,res) {
    let data = {
      level: req.body.levelWord
    }
    GuessWord.find({level: data.level})
    .then(dataLevel => {
      res.status(200).json({
        dataLevel,
        message: `Level has been found`
      })
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: `Level can't be found`
      })
    })
  },

  catchWord: function(req,res) {
    let dataGuess = {
      word: req.body.word
    }
    GuessWord.find(
      {word: dataGuess.word}
    )
    .populate("postBy")
    .then(dataWord => {
      console.log(`ini data getWord`, dataWord[0].word);
      let result = dataWord[0].word
      
      res.status(200).json({
        result,
        message: `Words has been found`
      })
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: `All words can't be found`
      })
    })
  },

  getWord: function(req,res) {
    console.log(`masuk getWord `, req.body.level);
    
    let dataGuess = {
      level: req.body.level,
    }
    console.log(`ini dataGuess `, dataGuess);
    
    GuessWord.find(
      {level: dataGuess.level},
    )
    .then(dataWord => {
      console.log(`ini data getWord`, dataWord[0].word);
      let words = dataWord[0].word
      let arrWords = words.split(', ')
      let randomArrWords = Math.floor(Math.random() * Math.floor(arrWords.length))
      let outputBefore = arrWords[randomArrWords]
      let randomOutputBefore = Math.floor(Math.random() * Math.floor(outputBefore.length))
      let count = outputBefore.length - 1
      let splitOutputBefore = outputBefore.split('')
      let temp = outputBefore
      let output = splitOutputBefore.sort()
      
      res.status(200).json({
        output,
        message: `Words has been found`
      })
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: `All words can't be found`
      })
    })
  },
  
  insert: function(req,res) {
    let dataGuess = new GuessWord({
      level: req.body.level,
      word: req.body.word
    })
    dataGuess.save()
    .then((dataGuess) => {
      console.log(`masuk insert guessWord `+dataGuess);
      res.status(201).json({
        dataGuess,
        message: `GuessWord has been added`
      })
    })
    .catch((err) => {
      console.log(`masuk catch insert guessWord `+err);
      res.status(500).json({
        err,
        message: `GuessWord can't be created`
      })
    })
  },


}