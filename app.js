const express = require('express')
const morgan = require('morgan')
const app = express()
const userRoutes = require('./routes/userRoutes')
const playlistRoutes = require('./routes/playlistRoutes')
const User = require('./models/user')

app.use(express.json())
app.use(morgan('Morgan On'))
app.use('/users', userRoutes)
app.use('/playlists', playlistRoutes)

module.exports = app