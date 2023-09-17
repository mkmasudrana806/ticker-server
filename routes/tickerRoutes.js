const { getTopTenTicker } = require("../controllers/tickerController");

const router = require("express").Router();

router.get("/top-ten-ticker", getTopTenTicker);

module.exports = router;
