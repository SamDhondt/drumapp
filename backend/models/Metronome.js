const mongoose = require("mongoose");

const MetronomeSchema = new mongoose.Schema({
    tempo: Number,
    type: String,
});

mongoose.model("Metronome", MetronomeSchema);