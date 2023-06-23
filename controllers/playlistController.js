/*Requirements*/
const User = require("../models/user");
const Artist = require("../models/artist");
const Album = require("../models/album");
const Song = require("../models/song");
const Playlist = require("../models/playlist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "life";

/*Playlist*/
exports.createPlaylist = async (req, res) => {
  try {
    const playlistData = req.body;
    const user = await req.user;
    if (!user || user.loggedIn === false) {
      throw new Error("User not logged in.");
    } else {
      const playlist = await Playlist.create(playlistData);
      await playlist.save();
      user.playlists.addToSet(playlist);
      await user.save();
      res.json(user);
    }
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};
