const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

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
    origin: "http://127.0.0.1:5173",
  })
);

// ticker routes
app.use("/ticker", tickerRoutes);

// Database connection
connectMongoDb("mongodb://localhost:27017").then(() => {
  console.log("mongodb connected");
});

// initaily called ticker and store in database
tickerDataAndStore();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
