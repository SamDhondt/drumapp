const mongoose = require("mongoose");

const RudimentSchema = new mongoose.Schema({
    name: String,
});

mongoose.model("Rudiment", RudimentSchema);