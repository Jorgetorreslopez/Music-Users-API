const request = require('supertest')
const mongoose = require("mongoose")
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log("Users testing in 8080"))
const User = require('../models/user')

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  
  afterEach(async () => {
    await User.deleteMany();
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    mongoServer.stop();
    server.close();
  });

  describe("Tests the User Endpoints", () => {
    test("It should create a new User", async () => {
        const response = await request(app).post('/users').send({
            username: "test1",
            email: "testing@test.com",
            password: "thisistest"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.username).toEqual("test1")
        expect(response.body.user.email).toEqual("testing@test.com")
        expect(response.body.user).toHaveProperty("password")

    })
  })