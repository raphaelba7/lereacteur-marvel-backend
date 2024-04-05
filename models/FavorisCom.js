const mongoose = require("mongoose");

const FavorisCom = mongoose.model("FavorisCom", {
  title: String,
  id_api: String,
  image: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavorisCom;
