require('dotenv').config()
const mongoose = require('mongoose')

if (process.env.DEV === "true") {
    (async () => {
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })()
} else {
    mongoose.connect(process.env.MONGO_URI)
}

const Artist = require("./models/artist");
const Album = require("./models/album");
const Song = require("./models/song");


(async function() {
   await Artist.deleteMany({})
    const artists = await Artist.create([
        {name: "Ramone"},
        {name: "Milky Chance"},
        {name: "Childish Gambino"},
        {name: "Saint JHN"},
        {name: "Karol G"},
        {name: "Bad Bunny"},
        {name: "Project Pat"}
    ])
    
    await Album.deleteMany()
    const albums = await Album.create([
        {title: "Solitary Midnight Playlist: Burns & Moods"},
        {title: "Sadnecessary"},
        {title: "Trip Tape"},
        {title: "Because the Internet"},
        {title: "Camp"},
        {title: "Ghetto Lenny's Love Songs"},
        {title: "While the World Was Burning"},
        {title: "KG0516"},
        {title: "Ocean"},
        {title: "El Ultimo Tour Del Mundo"},
        {title: "Un Verano Sin Ti"},
        {title: "Mista Don't Play: Everythang's Workin"},
        {title: "Layin' Da Smackdown"}
    ])

    //await Song.deleteMany()
    const songs = await Song.create([
        {title: "Nocturne of Mood"},
        {title: "Foolish"},
        {title: "Your Place"},
        {title: "Running"},
        {title: "Sweet Sun"},
        {title: "Love Again"},
        {title: "Levitating"},
        {title: "Worldstar"},
        {title: "The Party"},
        {title: "Fire Fly"},
        {title: "Bonfire"},
        {title: "Borders"},
        {title: "Monica Lewinsky"},
        {title: "Roses"},
        {title: "Pray 4 Me"},
        {title: "Odisea"},
        {title: "Tusa"},
        {title: "Sin Corazon"},
        {title: "Yo Aprendi"},
        {title: "Dakiti"},
        {title: "120"},
        {title: "Party"},
        {title: "Titi Me Pregunto"},
        {title: "Gorilla Pimp"},
        {title: "Chicken Head"},
        {title: "Still Ridin Clean"},
        {title: "Take Da Charge"}
    ])

    console.log(artists, albums, songs)

    process.exit()
})()