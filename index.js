const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const database = require("./databaseConnection/connection");
// const webRoute = require("./routes/webRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cottageRoutes = require("./routes/cottageRoutes");
const guestRoutes = require("./routes/guestRoutes");
const statRoutes = require("./routes/statRoutes");
const loginRegisterRoutes = require("./routes/loginRegisterRoutes");

const app = express();

const port = process.env.PORT || 9000;

// Set the views folder
app.set("views", path.join(__dirname, "views"));

app.use(cors());
// Other configurations
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/booking", bookingRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/cottage", cottageRoutes);
app.use("/stat", statRoutes);
app.use("/", loginRegisterRoutes);

// Async function to start the server after MongoDB connection is initialized
async function startServer() {
  try {
    // Wait for MongoDB connection to be initialized
    await database.initializeMongoDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
}
// Call the function to start the server
startServer();
