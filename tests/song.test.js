const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8081, () => console.log("Songs Testing in 8081"));
const Song = require("../models/song");
const User = require('../models/user')
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Song.deleteMany();
  await User.deleteMany()
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe("Tests the Song Endpoints", () => {
    test('It should show a list of all available songs', async () => {
        const user = new User ({
            username: "test",
            email: "testing",
            password: "thisistest"
        })
        await user.save()
        const token = await user.generateAuthToken()
        
        const song1 = new Song({
            title: "test"
        })
        await song1.save()

        const song2 = new Song({
            title: "test 2"
        })
        await song2.save()

        const response = await request(app).get('/songs').set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(2)
    })
})