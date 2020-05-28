const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');

const DeveloperSchema = new mongoose.Schema({
    email: {
        type: String,
        ref: 'user',
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: (string) => validator.isEmail(string),
            message: 'provided email is invalid',
        }
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    status: {
        type: Boolean
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

DeveloperSchema.plugin(passportLocalMongoose)

module.exports = Developer = mongoose.model('developer', DeveloperSchema);