require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connection.once('open', () => console.log('Mongo ON'))


if (process.env.DEV === "true") {
    (async () => {
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })()
} else {
    mongoose.connect(process.env.MONGO_URI)
}

app.listen(PORT, () => {
    console.log(`Andre ${PORT}`)
})