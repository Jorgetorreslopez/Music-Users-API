const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8082, () => console.log("Playlists Testing in 8082"));
const Artist = require("../models/artist");
const Song = require("../models/song");
const User = require("../models/user");
const Playlist = require("../models/playlist");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Song.deleteMany();
  await User.deleteMany();
  await Playlist.deleteMany();
  await Artist.deleteMany();
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
      loggedIn: true,
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post(`/playlists`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "teststuff",
        description: "yes",
      });

    expect(response.statusCode).toBe(200);
  });

  test("It should show all the currently logged in user's playlists", async () => {
    const user = new User({
      username: "test1",
      email: "testing",
      password: "thisistest",
      loggedIn: true,
    });
    await user.save();
    const token = await user.generateAuthToken();

    const playlist = await Playlist.create([
      { title: "playlist1", description: "yes" },
      { title: "playlist2", description: "no" },
    ]);
    //console.log(playlist, "YOOOO");
    user.playlists.addToSet(...playlist);
    await user.save();

    const response = await request(app)
      .get("/playlists")
      .set("Authorization", `Bearer ${token}`);
    //console.log(response.body, "CODE!!!");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("It should update a playlist", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true,
    });
    await user1.save();

    const token = await user1.generateAuthToken();

    const playlist = await Playlist.create({
      title: "playlist1",
      description: "yes",
    });

    const response = await request(app)
      .put(`/playlists/${playlist._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "stuff", description: "si" });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual("stuff");
    expect(response.body.description).toEqual("si");
  });

  test("It should add a song to playlist", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true,
    });
    await user1.save();
    const token = await user1.generateAuthToken();

    const playlist = await Playlist.create({
      title: "playlist1",
      description: "yes",
    });
    await playlist.save();

    const artist1 = await Artist.create({ name: "yes" });

    const song1 = await Song.create({ title: "si", artist: artist1._id });
    await song1.save();

    const response = await request(app)
      .post(`/playlists/add/${playlist._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        artistName: "yes",
        songTitle: "si",
      });
    // console.log(playlist._id, "Playlist");
    // console.log(artist1, "Artist");
    // console.log(song1, "Song");
    //console.log(response.body, "RESULTS");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(`'si' added to playlist titled 'playlist1'.`);
  });

  test("It should remove a song to playlist", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true,
    });
    await user1.save();
    const token = await user1.generateAuthToken();

    const playlist = await Playlist.create({
      title: "playlist1",
      description: "yes",
    });
    await playlist.save();

    const artist1 = await Artist.create({ name: "yes" });

    const song1 = await Song.create({ title: "si", artist: artist1._id });
    await song1.save();
    playlist.songs.push(song1);
    await playlist.save();

    const response = await request(app)
      .post(`/playlists/remove/${playlist._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        artistName: "yes",
        songTitle: "si",
      });
    // console.log(playlist, "Playlist");
    // console.log(artist1, "Artist");
    // console.log(song1, "Song");
    // console.log(response.body, "RESULTS");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(
      `'si' removed from playlist titled 'playlist1'.`
    );
  });

  test("It should delete a specified playlist", async () => {
    const user1 = new User({
      username: "test",
      email: "testing",
      password: "thisistest",
      loggedIn: true,
    });
    await user1.save();

    const token = await user1.generateAuthToken();

    const playlist = await Playlist.create({
      title: "playlist1",
      description: "yes",
    });

    const response = await request(app)
      .delete(`/playlists/${playlist._id}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body, "YOOOOOO")
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual("'playlist1' delete successful")  
  });
});
