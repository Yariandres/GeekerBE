import mongoose from 'mongoose';

const coSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

});

const Company = mongoose.model('admin', coSchema)
export default Company;