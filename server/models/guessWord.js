const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guessWordSchema = new Schema({
    word: {
      type: String
    },
    level: {
      type: Number
    },
    postBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps : true
})

const GuessWord = mongoose.model('GuessWord', guessWordSchema)

module.exports = GuessWord