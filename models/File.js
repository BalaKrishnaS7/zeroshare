const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    storedName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    iv: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
