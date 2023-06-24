const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album'}],
    singles: String
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist