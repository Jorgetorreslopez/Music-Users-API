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

exports.startPlaylist = async (req, res) => {
  try {
    const {artist, album, song, playlistID } = req.body;
    const user = await req.user;
    if (!user || user.loggedIn === false) {
      throw new Error("User not logged in.");
    } else {
      const playlist = await Playlist.findById(playlistID)
      const newArtist = await Artist.create({name: artist});
      await newArtist.save();
      playlist.contents.push(newArtist)

      const artistID = await Artist.findOne(newArtist)
      const newAlbum = await Album.create({title: album})
      await newAlbum.save()
      artistID.albums.push(newAlbum)
      // const newSong = await Song.create({title: song})
      // await newSong.save()
      
      // user.playlists.contents.addToSet(newArtist);
      // await user.save();
      res.json({playlist, artistID});
    }
  } catch (error) {
    res.status(407).json({ message: error.message })
  }
};


exports.deleteStuff = async (req, res) => {
  try {
    await Album.find().deleteMany()
    res.json("Deleted")
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}