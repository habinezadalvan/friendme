import { Schema, model} from "mongoose";

const userInfo = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: String,
        maxlength : [20, 'Maximum city length is 20 characters'],
        default: '',
    },
    lastName: {
        type: String,
        maxlength : [20, 'Maximum city length is 20 characters'],
        default: ''
    },
    currentAddress: {
        city: {
            type: String,
            maxlength : [20, 'Maximum city length is 20 characters'],
            default: '',
        },
        country: {
            type: String,
            maxlength : [20, 'Maximum city length is 20 characters'],
            default: '',
        }
    },
    originAddress: {
        city: {
            type: String,
            maxlength : [20, 'Maximum city length is 20 characters'],
            default: '',
        },
        country: {
            type: String,
            maxlength : [20, 'Maximum city length is 20 characters'],
            default: '',
        }
    },
    relationship: {
        type: Number,
        enum: [1,2,3]
    },
}, {
    timestamps: true
});


export default model('Info', userInfo);