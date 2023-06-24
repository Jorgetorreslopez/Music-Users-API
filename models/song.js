const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    rating: { type: Number, min: 1, max: 5}
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song