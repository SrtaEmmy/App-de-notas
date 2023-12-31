const mongoose = require('mongoose');
const { Schema } = mongoose;

const problemSchema = new Schema({
    problem: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("problems", problemSchema);