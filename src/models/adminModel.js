import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    type: {
        type: String,
        required: false
    },

});

const AdminModel = mongoose.model('admin', adminSchema)
export default AdminModel;