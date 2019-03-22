const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const twitchRouter = require('./twitch')
const todoRouter = require('./todo')
const guessWordRouter = require('./guessWord')

router.get('/')
router.use('/user', userRouter)
router.use('/twitch', twitchRouter)
router.use('/todo', todoRouter)
router.use('/guessWord', guessWordRouter)


module.exports = router