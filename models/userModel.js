import mongoose from "mongoose";
import {isEmail} from 'validator';
import bcrypt from 'bcrypt';


const userSchama = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        min : [3, 'Minimum username length is 3 characters'],
        max : [10, 'Maximum username length is 10 characters'],
        required : [true, 'Username is required'],
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required : [true, 'Email is required'],
        validate : [isEmail, 'Please enter a valid email'],
        lowercase: true
    },
    password: {
        type: String,
        unique: true,
        min : [3, 'Minimum passowrd length is 6 characters'],
        required : [true, 'Password is required'],
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


},
{timestamps: true});

userSchama.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export default mongoose.model('User', userSchama);