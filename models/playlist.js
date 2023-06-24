const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist