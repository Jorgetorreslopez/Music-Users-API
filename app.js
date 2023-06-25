const express = require('express')
const morgan = require('morgan')
const app = express()
const userRoutes = require('./routes/userRoutes')
const playlistRoutes = require('./routes/playlistRoutes')
const songRoutes = require('./routes/songRoutes')

app.use(express.json())
app.use(morgan('Morgan On'))
app.use('/users', userRoutes)
app.use('/playlists', playlistRoutes)
app.use('/songs', songRoutes )

module.exports = app