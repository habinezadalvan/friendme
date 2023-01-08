import { Schema, model} from "mongoose";

const userInfo = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fistName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    currentAddress: {
        city: {
            type: String,
            max : [20, 'Maximum city length is 20 characters'],
        },
        country: {
            type: String,
            max : [20, 'Maximum city length is 20 characters'],
        }
    },
    origin: {
        city: {
            type: String,
            max : [20, 'Maximum city length is 20 characters'],
        },
        country: {
            type: String,
            max : [20, 'Maximum city length is 20 characters'],
        }
    }
}, {
    timestamps: true
});

userInfo.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});


export default new model('UserInfo');