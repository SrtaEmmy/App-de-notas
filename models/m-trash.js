const mongoose = require('mongoose');
const { Schema } = mongoose;

const trashSchema = new Schema({
    title: String,
    note: String
});

module.exports = mongoose.model("trash", trashSchema);