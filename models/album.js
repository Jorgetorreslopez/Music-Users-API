const mongoose = require = require('mongoose')

const albumSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5}
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album