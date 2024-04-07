const express = require("express");

const router = express.Router();

const User = require("../models/User");
const FavorisCom = require("../models/FavorisCom");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/favoris/comics", isAuthenticated, async (req, res) => {
  try {
    const userId = await User.findOne({ token: req.user.token });
    const favorisCom = await FavorisCom.find({ owner: userId._id });
    res.status(200).json({
      favoris: favorisCom,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/favoris/comics", isAuthenticated, async (req, res) => {
  try {
    const { title, id_api, image, description } = req.body;
    // finding user with token

    const userId = await User.findOne({ token: req.user.token });

    // if user not authenticated
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // exist in bd ?
    const existingComic = await FavorisCom.findOne({
      id_api,
      owner: userId._id,
    });
    if (existingComic) {
      return res.status(400).json({ message: "Already in database" });
    }
    if (title && id_api && image) {
      const newFavorisCom = new FavorisCom({
        title,
        id_api,
        image,
        description,
        owner: userId.id,
      });
      await newFavorisCom.save();
      res.status(201).json("Comics added in favorite!");
    } else {
      res
        .status(400)
        .json({ message: "title, id_api, description and image are required" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/favorisdislik/:id", async (req, res) => {
  try {
    const favorisCom = await FavorisCom.findByIdAndDelete(req.params.id);
    res.status(200).json("Favoris deleted succesfully !");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
