const { default: axios } = require("axios");
const Ticker = require("../models/Ticker");

// ####################  fetch ticker top ten data and store in database ##################
const tickerDataAndStore = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const { data } = response;
    //first top 10 ticker from the api
    const topTenTicker = Object.fromEntries(Object.entries(data).slice(0, 10));

    // Delete previous ticker data
    await Ticker.deleteMany({});

    const dataArr = Object.entries(topTenTicker).map(([platform, data]) => ({
      platform,
      last: data.last,
      buy: data.buy,
      sell: data.sell,
      volume: data.volume,
      base_unit: data.base_unit,
      name: data.name,
    }));
    await Ticker.insertMany(dataArr);
  } catch (error) {
    console.error("Error while fetching API:", error);
  }
};

// ############## get all the tickers data from the database ###########
const getTopTenTicker = async (req, res) => {
  try {
    const topTenTickers = await Ticker.find();
    res.status(200).json(topTenTickers);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getTopTenTicker,
  tickerDataAndStore,
};
