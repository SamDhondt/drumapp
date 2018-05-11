const mongoose = require("mongoose");

const PracticeSessionSchema = new mongoose.Schema({
    rudiment: {type: mongoose.Schema.Types.ObjectId, ref: "Rudiment"},
    tempo: Number,
    start: Date,
    end: Date
});

mongoose.model("PracticeSession", PracticeSessionSchema);