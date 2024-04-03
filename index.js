// require("dotenv").config();

const express = require("express"); // import du package express
const cors = require("cors");

const app = express(); // création du serveur

app.use(cors());
app.use(express.json());

const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

app.all("*", (req, res) => {
  res.status(500).json({ message: "This page does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  // Mon serveur va écouter l'api du réacteur
  console.log("Server started 🔥"); // Quand je vais lancer ce serveur, la callback va être appelée
});
