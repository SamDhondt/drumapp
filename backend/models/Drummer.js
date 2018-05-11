const mongoose = require("mongoose");

const DrummerSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    practiceSessions: [{type: mongoose.Schema.Types.ObjectId, ref:"PracticeSession"}],
    metronome: {type: mongoose.Schema.Types.ObjectId, ref:"Metronome"},
});

mongoose.model("Drummer", DrummerSchema);