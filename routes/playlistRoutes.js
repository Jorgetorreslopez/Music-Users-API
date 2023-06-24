const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')
const userController = require('../controllers/userController')

router.post('/:id', userController.auth, playlistController.createPlaylist)
router.post('/start/:id', userController.auth, playlistController.startPlaylist)

router.delete('/', playlistController.deleteStuff)

module.exports = router