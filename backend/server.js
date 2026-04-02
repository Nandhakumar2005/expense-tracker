require("dotenv").config({ path: "../.env" });

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/expenses", require("./routes/expenseRoutes"));

// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});