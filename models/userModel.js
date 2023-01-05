import mongoose from "mongoose";
import validator from 'validator';
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
        validate : [validator.isEmail, 'Please enter a valid email'],
        lowercase: true
    },
    password: {
        type: String,
        unique: true,
        required : [true, 'Password is required'],
        validate: [validator.isStrongPassword, 'The password should be 8 characters long, with at least 1 small and capital letters, and 1 symbol.']
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
    }

},
{timestamps: true});

// hash password

userSchama.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// login method

userSchama.statics.login = async function (...args) {
    const {email, username, password} = args[0];
  
    try{
        const user = await this.findOne({$or: [{email}, {username}]});

    if(!user) throw Error('Incorrect email, username, or password.');
    const comparePasswords = await bcrypt.compare(password, user.password);
    if(!comparePasswords) throw Error('Incorrect email, username, or password.');
    return user;
    }catch(err){
     
        throw Error('Incorrect email, username, or password.');
    }
}

export default mongoose.model('User', userSchama);