const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    title: {type: String, required: false},
    note: {type: String, required: false},
    date: {type: Date, default: Date.now},
    favorite: {type: Boolean, default: false}
});
                             //collection
module.exports = mongoose.model('allNotes', noteSchema);