const mongoose = require('mongoose');

var Person = mongoose.model('Person', {
    name: { type: String },
    gender: { type: String },
    age: { type: Number },
    phoneNumber: { type: Number }
});

module.exports = { Person };