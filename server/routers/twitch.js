const express = require('express');
const router = express.Router();

const Controller = require('../controllers/twitch')

router.get('/home', Controller.getHome)
router.get('/search/:game', Controller.search)
router.get('/top', Controller.topGame)

module.exports = router;
