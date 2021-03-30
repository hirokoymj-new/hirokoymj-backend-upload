const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Photo", photoSchema);
