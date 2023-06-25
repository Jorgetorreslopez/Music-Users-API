const express = require('express')
const router = express.Router()
const songController = require('../controllers/songController')
const userController = require('../controllers/userController')

router.get('/', songController.songIndex)

module.exports = router