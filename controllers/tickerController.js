const { default: axios } = require("axios");
const Ticker = require("../models/Ticker");

// ####################  fetch ticker top ten data and store in database ##################
const tickerDataAndStore = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const { data } = response;
    //first top 10 ticker from the api
    const topTenTicker = Object.fromEntries(Object.entries(data).slice(0, 10));

    // delete previous ticker
    await Ticker.deleteMany({});

    // extract data and store it in the database
    Object.entries(topTenTicker).map(([platform, data]) => {
      const newTicker = new Ticker({
        platform,
        last: data.last,
        buy: data.buy,
        sell: data.sell,
        volume: data.volume,
        base_unit: data.base_unit,
        name: data.name,
      });
      newTicker.save();
    });
  } catch (error) {
    console.error("Error while fetching API:", error);
  }
};

// ############## get all the tickers data from the database ###########
const getTopTenTicker = async (req, res) => {
  const tickers = await Ticker.find({});
  res.json(tickers);
};

module.exports = {
  getTopTenTicker,
  tickerDataAndStore,
};
