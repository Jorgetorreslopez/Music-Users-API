const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8082, () => console.log("Playlists Testing in 8082"));
const Song = require("../models/song");
const User = require('../models/user')
const Playlist = require('../models/playlist')
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Song.deleteMany();
  await User.deleteMany()
  await Playlist.deleteMany()
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe("Tests the Playlist Endpoints", () => {
    test("It should create a new playlist within User", async () => {
        const user = new User({
            username: "test1",
            email: "testing",
            password: "thisistest",
            loggedIn: true
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app).post(`/playlists/${user._id}`).set("Authorization", `Bearer ${token}`).send({
            title: "teststuff",
            description: "yes"
        })

        expect(response.statusCode).toBe(200)
    })
})