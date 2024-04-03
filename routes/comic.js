require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

// get  list of comics
router.get(`/comics`, async (req, res) => {
  try {
    const { title, skip, limit } = req.query;
    const { data } = await axios.get(
      `${process.env.API_URL}comics?apiKey=${process.env.API_KEY}&name=${title}&limit=${limit}&skip=${skip}`
    );
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
