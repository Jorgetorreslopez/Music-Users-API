const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {type: String, required: true},
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album