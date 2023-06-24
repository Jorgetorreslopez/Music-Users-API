const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')
const userController = require('../controllers/userController')

router.post('/:id', userController.auth, playlistController.createPlaylist)
router.post('/addsong/:id', userController.auth, playlistController.addSong)

module.exports = router