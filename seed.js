require("dotenv").config();
const mongoose = require("mongoose");
const Artist = require("./models/artist");
const Album = require("./models/album");
const Song = require("./models/song");

(async function () {
  try {
    if (process.env.DEV === "true") {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    } else {
      await mongoose.connect(process.env.MONGO_URI);
    }

    await Artist.deleteMany({});
    const artists = await Artist.create([
      { name: "Ramone" },
      { name: "Milky Chance" },
      { name: "Childish Gambino" },
      { name: "Saint JHN" },
      { name: "Karol G" },
      { name: "Bad Bunny" },
      { name: "Project Pat" },
      { name: "Lil Peep" },
      { name: "2PAC" },
    ]);

    await Album.deleteMany();
    const albums = await Album.create([
      { title: "Solitary Midnight Playlist: Burns & Moods" },
      { title: "Sadnecessary" },
      { title: "Trip Tape" },
      { title: "Because the Internet" },
      { title: "Camp" },
      { title: "Ghetto Lenny's Love Songs" },
      { title: "While the World Was Burning" },
      { title: "KG0516" },
      { title: "Ocean" },
      { title: "El Ultimo Tour Del Mundo" },
      { title: "Un Verano Sin Ti" },
      { title: "Mista Don't Play: Everythang's Workin" },
      { title: "Layin' Da Smackdown" },
      { title: "Hellboy" },
      { title: "Come Over When Your Sober" },
      { title: "All Eyez On Me" },
      { title: "Me Against the World" },
    ]);

    await Song.deleteMany();
    const songs = await Song.create([
      { title: "Nocturne of Mood", artist: artists[0], album: albums[0] },
      { title: "Foolish", artist: artists[0], album: albums[0] },
      { title: "Your Place", artist: artists[0], album: albums[0] },
      { title: "Running", artist: artists[1], album: albums[1] },
      { title: "Sweet Sun", artist: artists[1], album: albums[1] },
      { title: "Love Again", artist: artists[1], album: albums[2] },
      { title: "Levitating", artist: artists[1], album: albums[2] },
      { title: "Worldstar", artist: artists[2], album: albums[3] },
      { title: "The Party", artist: artists[2], album: albums[3] },
      { title: "Fire Fly", artist: artists[2], album: albums[4] },
      { title: "Bonfire", artist: artists[2], album: albums[4] },
      { title: "Borders", artist: artists[3], album: albums[5] },
      { title: "Monica Lewinsky", artist: artists[3], album: albums[5] },
      { title: "Roses", artist: artists[3], album: albums[6] },
      { title: "Pray 4 Me", artist: artists[3], album: albums[6] },
      { title: "Odisea", artist: artists[4], album: albums[7] },
      { title: "Tusa", artist: artists[4], album: albums[7] },
      { title: "Sin Corazon", artist: artists[4], album: albums[8] },
      { title: "Yo Aprendi", artist: artists[4], album: albums[8] },
      { title: "Dakiti", artist: artists[5], album: albums[9] },
      { title: "120", artist: artists[5], album: albums[9] },
      { title: "Party", artist: artists[5], album: albums[10] },
      { title: "Titi Me Pregunto", artist: artists[5], album: albums[10] },
      { title: "Gorilla Pimp", artist: artists[6], album: albums[11] },
      { title: "Chicken Head", artist: artists[6], album: albums[11] },
      { title: "Still Ridin Clean", artist: artists[6], album: albums[12] },
      { title: "Take Da Charge", artist: artists[6], album: albums[12] },
      { title: "Girls", artist: artists[7], album: albums[13] },
      { title: "Cobain", artist: artists[7], album: albums[13] },
      { title: "Runaway", artist: artists[7], album: albums[14] },
      { title: "White Girl", artist: artists[7], album: albums[14] },
      { title: "I Ain't Mad At Cha", artist: artists[8], album: albums[15] },
      { title: "Ambitionz Az A Ridah", artist: artists[8], album: albums[15] },
      { title: "Dear Mama", artist: artists[8], album: albums[16] },
      { title: "Me Against the World", artist: artists[8], album: albums[16] },
    ]);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    process.exit();
  }
})();
