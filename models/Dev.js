const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Developer = mongoose.model('developer', DeveloperSchema);