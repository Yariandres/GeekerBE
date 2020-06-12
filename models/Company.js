const mongoose = require('mongoose');

const coSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    requestedSkills: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = Company = mongoose.model('company', coSchema)