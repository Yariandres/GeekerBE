import mongoose from 'mongoose';

const speedDateSchema = new mongoose.Schema({
    type: {
        type: String,
        date: date,
        link: String,
        time: time,
        required: true
    },

});

const SpeedDate = mongoose.model('admin', speedDateSchema)
export default SpeedDate;