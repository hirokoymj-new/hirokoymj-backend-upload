const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    require: true,
  },
  coord: {
    lon: {
      // type: mongoose.Schema.Types.Decimal128,
      type: Number,
    },
    lat: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("City", citySchema);
