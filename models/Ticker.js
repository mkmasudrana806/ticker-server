const mongoose = require("mongoose");

const tickerSchema = new mongoose.Schema({
  platform: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
  name: String,
});

const Ticker = mongoose.model("Ticker", tickerSchema);
module.exports = Ticker;
