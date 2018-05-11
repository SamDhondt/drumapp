const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    tempo: Number,
    start: Date,
    end: Date,
});

mongoose.model("Progress", ProgressSchema);