import mongoose from 'mongoose';

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
        type: date,
        default: Date.now
    }

});

const Company = mongoose.model('admin', coSchema)
export default Company;