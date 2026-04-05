require("dotenv").config({ path: "../.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Import routes
const expenseRoutes = require("./routes/expenseRoutes");

// Use routes
app.use("/api/expenses", expenseRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});