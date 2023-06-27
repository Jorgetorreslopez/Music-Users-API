const Song = require("../models/song");

exports.songIndex = async (req, res) => {
    try {
      const songs = await Song.find().sort({ "artist": 1 }).populate('artist').populate('album');
      res.json(songs);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };