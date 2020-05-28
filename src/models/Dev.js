import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import validator from 'validator';

const devSchema = new mongoose.Schema({
    //how do we do this info part anonomously?
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: (string) => validator.isEmail(string),
            message: 'provided email is invalid',
        }
    },
    profile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

});

devSchema.plugin(passportLocalMongoose)

const Dev = mongoose.model('admin', devSchema)
export default Dev;