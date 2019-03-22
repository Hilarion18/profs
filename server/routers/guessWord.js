const express = require('express');
const router = express.Router();

const { getWords, getWord, catchWord, getLevel, insert} = require('../controllers/guessWord')
const isLogin = require('../middleware/isLogin')

// router.put('/update/:id', (req,res) => {
//   console.log(`halo`)
// })
// router.get('/', (req,res) => {
//     console.log(`halo`)
//   })
router.get('/', getWords)
router.post('/getWord', isLogin, getWord)
router.post('/catchWord', isLogin, catchWord)
// router.get('/level', getLevel)
router.post('/', insert)

module.exports = router