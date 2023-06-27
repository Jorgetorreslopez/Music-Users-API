const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.createUser)
router.post('/login', userController.auth, userController.loginUser)
router.get('/', userController.allUsers)
router.post('/logout', userController.auth, userController.logoutUser)
router.delete('/', userController.auth, userController.deleteUser)
router.put('/:id', userController.auth, userController.editUserInfo)

module.exports = router