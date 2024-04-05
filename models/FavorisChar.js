const mongoose = require("mongoose");

const FavorisChar = mongoose.model("FavorisChar", {
  name: String,
  id_api: String,
  image: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavorisChar;
