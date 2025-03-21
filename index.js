const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const apiRoutes = require("./routes/apiRoutes");

// Use routes
app.use("/api", apiRoutes);

// Set up a test route
app.get("/", (req, res) => {
    res.send("Welcome to the Book Collection API");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
