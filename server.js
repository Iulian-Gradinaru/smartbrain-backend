const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const clarifai = require("./controllers/clarifai");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "herculeS2.8",
    database: "postgres",
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

// Here is Signin
app.post("/signin", signin.handleSignin(db, bcrypt));

//We send the registry credentials to the database
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// Getting user profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

//  Updating entries
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/clarifai", (req, res) => {
  clarifai.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
