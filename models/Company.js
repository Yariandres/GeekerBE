import mongoose from 'mongoose';

const coSchema = new mongoose.Schema({
    type: {
        type: String,
        description: String,
        email: String,
        stack: String,
        required: true
    },

});

const Company = mongoose.model('admin', coSchema)
export default Company;