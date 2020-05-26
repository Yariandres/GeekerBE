import mongoose from 'mongoose';

const devSchema = new mongoose.Schema({
    type: {
        type: String,
        profile: String,
        role: String,
        email: String,
        required: true
    },
});

const Dev = mongoose.model('admin', devSchema)
export default Dev;