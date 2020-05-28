import mongoose from 'mongoose';

const DeveloperSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Type.ObjectID,
        ref: 'user'
    },
    title: {
        type: String
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

odule.exports = Developer = mongoose.model('developer', DeveloperSchema);