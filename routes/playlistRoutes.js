const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");
const userController = require("../controllers/userController");

router.post("/", userController.auth, playlistController.createPlaylist);
router.get("/", userController.auth, playlistController.showAllPlaylists);
router.put("/:id", userController.auth, playlistController.editPlaylistInfo);
router.post(
  "/add/:id",
  userController.auth,
  playlistController.addSongToPlaylist
);
router.post(
  "/remove/:id",
  userController.auth,
  playlistController.removeSongFromPlaylist
);
router.delete("/", userController.auth, playlistController.deletePlaylist);
router.delete("/deleteAll", playlistController.deleteAllPlaylist);

module.exports = router;
