const express = require('express')
const morgan = require('morgan')
const app = express()
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(morgan('Morgan On'))
app.use('/users', userRoutes)

module.exports = app