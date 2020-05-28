import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    type: {
        type: String,
        required: false
    },

});

const Admin = mongoose.model('admin', adminSchema)
export default Admin;