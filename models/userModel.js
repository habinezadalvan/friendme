import mongoose from "mongoose";
import validator from 'validator';
import moment from 'moment';
import {hashPassword, comparePassword} from '../utils/passwordUtils.js';



const minimumAge = moment(Date.now()).subtract(18, 'years');
const maximumAge = moment(Date.now()).subtract(120, 'years');

const userSchama = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength : [3, 'Minimum username length is 3 characters.'],
        maxlength : [20, 'Maximum username length is 20 characters.'],
        required : [true, 'Username is required.'],
        lowercase: true,
        validate : {
            validator : (value) => {
                return !(/\s/g).test(value);
            },
            message: `Username should not has white spaces.`
        }
    },
    email: {
        type: String,
        unique: true,
        required : [true, 'Email is required'],
        maxlength : [50, 'Maximum email length is 50 characters'],
        validate : [validator.isEmail, 'Please enter a valid email.'],
        lowercase: true
    },
    password: {
        type: String,
        unique: true,
        required : [true, 'Password is required.'],
        validate: [validator.isStrongPassword, 'Password must be at least 8 characters long, 1 symbols, 1 number, 1 capital and lowcase letters.']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required.'],
        // validate: {
        //     validator: (value) => {
        //         return value < minimumAge && value > maximumAge;
        //     },
        //     message: `You should be born between ${minimumAge} and ${maximumAge}`
        // }
    },
    age: {
        type: Number,
        min: [18, 'Mininum age is 18 years old.'],
        max: [120, 'Sorry, maxinum user age is 120.'],
    },
    profilePicture : {
        type: String,
        default: ''
    },
    coverPicture : {
        type: String,
        default: ''
    },
    followers : {
        type: Array,
        default: []
    },
    followings : {
        type: Array,
        default: []
    },
    isAdim: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        maxlength: 50
    },
},
{timestamps: true});

// hash password

userSchama.pre('save', async function (next) {
    this.password = await hashPassword(this.password);
    next();
})

// login method

userSchama.statics.login = async function (...args) {
    const {email, username, password} = args[0];
  
    try{
        const user = await this.findOne({$or: [{email}, {username}]});

    if(!user) return null;
    const comparePasswords = await comparePassword(password, user.password);
    if(!comparePasswords) return null;
    return user;
    }catch(err){
     
        return err;
    }
}

export default mongoose.model('User', userSchama);