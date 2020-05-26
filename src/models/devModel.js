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

const DevModel = mongoose.model('admin', devSchema)
export default DevModel;