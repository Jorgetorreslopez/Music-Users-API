const Song = require("../models/song");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "life";

exports.songIndex = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate({
        path: "artist",
        options: { sort: { name: 1 } },
      })
      .populate("album");
    res.json(songs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
