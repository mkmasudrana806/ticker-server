const router = require("express").Router();

const { getTopTenTicker } = require("../controllers/tickerController");

router.get("/top-ten-ticker", getTopTenTicker);

module.exports = router;
