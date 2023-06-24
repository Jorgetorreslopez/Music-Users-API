/*Requirements*/
const User = require("../models/user");
const Artist = require("../models/artist");
const Album = require("../models/album");
const Song = require("../models/song");
const Playlist = require('../models/playlist')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "life";


/*User & Authorization*/
exports.auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, "life");
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error("User not found to Authorize");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Not Authorized");
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("Email address not Found");
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send("Incorrect Password");
    } else {
      user.loggedIn = true;
      await user.save();
      const token = await user.generateAuthToken();
      res.json("Logged In Successfully");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().populate('playlists');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!user || user.loggedIn === false) {
      res.status(400).send("Email address not Found or not logged in");
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send("Incorrect Password");
    } else {
      user.loggedIn = false;
      await user.save();
      res.json({ message: "Log Out Successful" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.loggedIn === false) {
      res.status(400).send("User not logged in");
    } else {
      await req.user.deleteOne();
      res.json({ message: `User '${req.user.username}' Deleted.` });
    }
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};