const mongoose = require("mongoose");

const RudimentInProgressSchema = new mongoose.Schema({
    name: String,
    progresses: [{tempo: Number, start: Date, end: Date}],
});

mongoose.model("RudimentInProgress", RudimentInProgressSchema);