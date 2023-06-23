const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: String,
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}]
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist