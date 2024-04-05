const express = require("express");

const router = express.Router();

const User = require("../models/User");
const FavorisChar = require("../models/FavorisChar");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/favoris/char", isAuthenticated, async (req, res) => {
  try {
    const userId = await User.findOne({ token: req.user.token });
    const favorisChar = await FavorisChar.find({ owner: userId._id });
    res.status(200).json({
      favoris: favorisChar,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/favoris/char", isAuthenticated, async (req, res) => {
  try {
    const { name, id_api, image, description } = req.body;
    // finding user with token

    const userId = await User.findOne({ token: req.user.token });

    // if user not authenticated
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // exist in bd ?
    const existingCharacter = await FavorisChar.findOne({
      id_api,
      owner: userId._id,
    });
    if (existingCharacter) {
      return res.status(400).json({ message: "Already in database" });
    }
    if (name && id_api && image && description) {
      const newFavorisChar = new FavorisChar({
        name,
        id_api,
        image,
        description,
        owner: userId.id,
      });
      await newFavorisChar.save();
      res.status(201).json("Character added in favorite!");
    } else {
      res.status(400).json({ message: "name, id_api and image are required" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/favorisdislike/:id", async (req, res) => {
  try {
    const favorisCharToDelete = await FavorisChar.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("Favoris deleted succesfully !");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
