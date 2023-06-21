const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    singles: {type: String, required: true}
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist