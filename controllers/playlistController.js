/*Requirements*/
const Artist = require("../models/artist");
const Song = require("../models/song");
const Playlist = require("../models/playlist");
const Album = require("../models/album");

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

exports.showAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate({
      path: "songs",
      select: "title",
      populate: [
        { path: "artist", select: "name", model: "Artist" },
        { path: "album", select: "title", model: "Album" },
      ],
    });
    res.json(playlists);
  } catch (error) {
    res.status(407).json({ message: error.message });
  }
};

exports.editPlaylistInfo = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const playlist = await Playlist.findOne({ _id: req.params.id });
    if (req.user.loggedIn === false) {
      res.status(400).json({ message: "User not logged in." });
    } else {
      updates.forEach((update) => (playlist[update] = req.body[update]));
      await playlist.save();
      res.json(playlist);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      res.status(400).json({ message: "Playlist not found." });
    } else {
      const { artistName, songTitle } = req.body;
      const artist = await Artist.findOne({ name: artistName });
      if (!artist) {
        return res.status(404).json({ message: "Artist not Found " });
      }

      const song = await Song.findOne({ title: songTitle, artist: artist._id });
      if (!song) {
        res.status(403).json({
          message:
            "Song currently not Available. Besides it sucks.... You suck.",
        });
      } else {
        playlist.songs.push(song);
        await playlist.save();
        return res.status(200).json({
          message: `'${song.title}' added to playlist titled '${playlist.title}'.`,
        });
      }
    }
  } catch (error) {
    return res.status(408).json({ message: error.message });
  }
};

exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found." });
    } else {
      const { artistName, songTitle } = req.body;
      const artist = await Artist.findOne({ name: artistName });
      if (!artist) {
        res.status(401).json({ message: "Artist not Found " });
      }

      const song = await Song.findOne({ title: songTitle, artist: artist._id });
      if (!song) {
        res.status(401).json({ message: "Song not found." });
      } else {
        playlist.songs.pull(song);
        await playlist.save();
        res.status(200).json({
          message: `'${song.title}' removed from playlist titled '${playlist.title}'.`,
        });
      }
    }
  } catch (error) {
    res.status(410).json({ message: error.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (req.user.loggedIn === false) {
      res.status(400).json({ message: "User not logged in." });
    } else if (!playlist) {
      res.status(404).json({ message: "Playlist not found." });
    } else {
      await playlist.deleteOne();
      res.json({ message: `'${playlist.title}' delete successful` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAllPlaylist = async (req, res) => {
  try {
    await Playlist.find().deleteMany();
    res.json({ message: `'All delete successful` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
