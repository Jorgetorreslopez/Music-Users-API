const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const playlistController = require('../controllers/playlistController')

router.post('/', userController.createUser)
router.post('/login', userController.auth, userController.loginUser)
router.get('/', userController.allUsers)
router.post('/logout', userController.auth, userController.logoutUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.post('/playlist/:id', userController.auth, playlistController.createPlaylist)

module.exports = router