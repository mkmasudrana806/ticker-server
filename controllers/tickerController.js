const { default: axios } = require("axios");
const Ticker = require("../models/Ticker");

// assume that given api is will be updated each 1 minute interval,then given api is called every 1 minute interval
const tickerDataAndStore = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const { data } = response;

    //first top 10 ticker from the api
    const topTenTicker = Object.fromEntries(Object.entries(data).slice(0, 10));

    // extract data and store it in the database
    const datas = Object.entries(topTenTicker).map(([platform, data]) => {
      const newTicker = new Ticker({
        platform,
        last: data.last,
        buy: data.buy,
        sell: data.sell,
        volume: data.volume,
        base_unit: data.base_unit,
      });
      newTicker.save();
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

// get all the tickers from the database
const getTopTenTicker = async (req, res) => {
  console.log("get top ten ticker api called");
  res.json("api called");
};

module.exports = {
  getTopTenTicker,
  tickerDataAndStore,
};
