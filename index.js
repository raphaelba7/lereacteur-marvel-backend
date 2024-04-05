require("dotenv").config();

const express = require("express"); // import package express
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Creat serv

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// route all comics && comics by character
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

// route all character
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

// route login  and signin
const loginSignInRoutes = require("./routes/user");
app.use(loginSignInRoutes);

// route favoris character
const characFavRoutes = require("./routes/favorisChar");
app.use(characFavRoutes);

// route favoris comics
const comicsFavRoutes = require("./routes/favorisCom");
app.use(comicsFavRoutes);

app.all("*", (req, res) => {
  res.status(500).json({ message: "This page does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  // My serv listener
  console.log("Server started 🔥");
});
