/*Requirements*/
const User = require("../models/user");
const Artist = require("../models/artist");
const Album = require("../models/album");
const Song = require("../models/song");
const Playlist = require("../models/playlist");

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
      res.status(400).send("User not logged in.");
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
      res.status(400).send("Playlist not found.");
    } else {
      const { artistName, songTitle } = req.body;
      const artist = await Artist.findOne({ name: artistName });
      if (!artist) {
        res.status(401).send("Artist not Found ");
      }

      const song = await Song.findOne({ title: songTitle, artist: artist._id });
      if (!song) {
        res
          .status(400)
          .send("Song currently not Available. Besides it sucks.... You suck.");
      } else {
        playlist.songs.push(song);
        await playlist.save();
        res
          .status(200)
          .send(
            `'${song.title}' added to playlist titled '${playlist.title}'.`
          );
      }
    }
  } catch (error) {
    res.status(410).send({ message: error.message });
  }
};

exports.removeSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      res.status(400).send("Playlist not found.");
    } else {
      const { artistName, songTitle } = req.body;
      const artist = await Artist.findOne({ name: artistName });
      if (!artist) {
        res.status(401).send("Artist not Found ");
      }

      const song = await Song.findOne({ title: songTitle, artist: artist._id });
      if (!song) {
        res.status(400).send("Song not found.");
      } else {
        playlist.songs.pop(song);
        await playlist.save();
        res
          .status(200)
          .send(
            `'${song.title}' removed from playlist titled '${playlist.title}'.`
          );
      }
    }
  } catch (error) {
    res.status(410).send({ message: error.message });
  }
};

// exports.deleteStuff = async (req, res) => {
//   try {
//     await Album.find().deleteMany();
//     res.json("Deleted");
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
