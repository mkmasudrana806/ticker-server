const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cron = require("node-cron");
const port = process.env.PORT || 5000;

// mongodb connection file
const { connectMongoDb } = require("./connection");

// routes path
const tickerRoutes = require("./routes/tickerRoutes");
const { tickerDataAndStore } = require("./controllers/tickerController");

// middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/", (req, res) => {
  res.send("server is running");
});
// ticker routes
app.use("/ticker", tickerRoutes);

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktfe5gd.mongodb.net/?retryWrites=true&w=majority`;
connectMongoDb(uri).then(() => {
  console.log("mongodb connected");
});

//
// assume that the ticker data will be updated every minute
const frequency = "* * * * *"; // This schedule means "every minute"

// Call tickerDataAndStore immediately
tickerDataAndStore();

cron.schedule(frequency, tickerDataAndStore);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
