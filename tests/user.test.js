const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8080, () => console.log("Users testing in 8080"));
const User = require("../models/user");

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
    const response = await request(app).post("/users").send({
      username: "test1",
      email: "testing@test.com",
      password: "thisistest",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toEqual("test1");
    expect(response.body.user.email).toEqual("testing@test.com");
    expect(response.body.user).toHaveProperty("password");
  });

  test("It should show a list of all users", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
    });
    await user1.save();

    const user2 = new User({
      username: "test2",
      email: "testing2",
      password: "thisistest2",
    });
    await user2.save();

    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("It should login a user", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
    });
    await user1.save();

    const token = await user1.generateAuthToken();

    const response = await request(app)
      .post("/users/login")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "testing", password: "thisistest" });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual("Logged In Successfully"); 
  });

  test("It should logout a user", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true
    });
    await user1.save();

    const token = await user1.generateAuthToken();

    const response = await request(app)
      .post("/users/logout")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "testing", password: "thisistest" });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("Log Out Successful"); 
  });

  test("It should update a user", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true
    });
    await user1.save();

    const token = await user1.generateAuthToken();

    const response = await request(app)
      .put(`/users/${user1._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "Jane Doe", email: "jane.doe@example.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual("Jane Doe");
    expect(response.body.email).toEqual("jane.doe@example.com");
  });

  test("It should delete a user", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true
    });
    await user1.save();

    const token = await user1.generateAuthToken();

    const response = await request(app)
      .delete("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("User deleted");
  })
});
