const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    rating: { type: Number, required: true, min: 1, max: 5},
    favoriteSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album