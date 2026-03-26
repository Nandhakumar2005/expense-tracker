const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 Paste your connection string here (use Standard connection string from Atlas)
const MONGO_URI = "mongodb://nks21340130_db_user:test123@ac-xdrysdc-shard-00-00.ysbgjme.mongodb.net:27017,ac-xdrysdc-shard-00-01.ysbgjme.mongodb.net:27017,ac-xdrysdc-shard-00-02.ysbgjme.mongodb.net:27017/expenseDB?ssl=true&replicaSet=atlas-14ljrr-shard-0&authSource=admin&appName=Cluster0";
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});