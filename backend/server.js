// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tapswap', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

// API Endpoints
app.get("/api/user/:id", async (req, res) => {
    const userId = req.params.id;
    let user = await User.findOne({ telegramId: userId });
    if (!user) {
        user = await User.create({ telegramId: userId });
    }
    res.json(user);
});

app.post("/api/user/:id/add-coin", async (req, res) => {
    const userId = req.params.id;
    const { coins } = req.body;
    const user = await User.findOneAndUpdate(
        { telegramId: userId },
        { $inc: { coins: coins } },
        { new: true }
    );
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
