require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

// get  list of character
router.get(`/characters`, async (req, res) => {
  try {
    const { name = "", skip = "", limit = "" } = req.query;

    const response = await axios.get(
      `${process.env.API_URL}characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
    );
    const data = response.data;

    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
