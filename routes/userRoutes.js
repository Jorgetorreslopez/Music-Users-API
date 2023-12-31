const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.post("/login", userController.auth, userController.loginUser);
router.get("/", userController.allUsers);
router.post("/logout", userController.auth, userController.logoutUser);
router.delete("/", userController.auth, userController.deleteUser);
router.put("/", userController.auth, userController.editUserInfo);

router.delete("/deleteAll", userController.deleteAllUsers)

module.exports = router;
