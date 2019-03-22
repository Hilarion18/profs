const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    date: {
        type: String
    },
    title: {
        type:  String
    },
    description: {
        type: String
    },
    checklist: {
        type: Boolean,
        default: false
    },
    contentFilled: {
        type: Boolean,
        default: true
    },
    postBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps : true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo