require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

// get  list of all comics with filter
router.get(`/comics`, async (req, res) => {
  try {
    const { title = "", skip = "", limit = "" } = req.query;
    const { data } = await axios.get(
      `${process.env.API_URL}comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get comics containing a specific character
router.get(`/comics/:characterId`, async (req, res) => {
  try {
    const { characterId } = req.params;
    const { data } = await axios.get(
      `${process.env.API_URL}comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
