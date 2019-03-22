const express = require('express');
const router = express.Router();

const { findAll, insert, update, remove } = require('../controllers/todo')
const isLogin = require('../middleware/isLogin')

// router.put('/update/:id', (req,res) => {
//   console.log(`halo`)
// })
router.get('/', isLogin, findAll)
router.post('/insert', isLogin, insert)
router.put('/update/:id', isLogin, update)
router.delete('/remove/:id', isLogin, remove)

module.exports = router