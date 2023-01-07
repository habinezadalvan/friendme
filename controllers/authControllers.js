import validator from 'validator';
import User from '../models/userModel.js';
import {databaseErrorHandlingFunction} from '../helpers/userHelpers.js';
import {createToken} from '../helpers/createToken.js'


    const maxAge = 2 * 24 * 60 * 60;

 export const signUp = async(req, res) =>{
        const {username, email, password} = req.body;

       try{
        const user = await User.create({
            username: username.replace(/\s/g, '').trim(),
            email,
            password,
        });

        if(user){
            const token = await createToken(user, maxAge);
            res.cookie('jwt', token, {maxAge: maxAge * 1000, httpOnly: true});
            return res.status(201).json({user});
        }

       }catch(error) {
       
        const errors = databaseErrorHandlingFunction(error);
        return res.status(400).json(errors);
       }
    };

    export const login = async (req, res) => {
        const {password, username} = req.body;
        const userCridentials = {
            email: '',
            username: '',
            password
        };

        validator.isEmail(username) ? userCridentials.email = username : userCridentials.username = username;

        try{
            const user = await User.login(userCridentials);
            const token = await createToken(user, maxAge);
            res.cookie('jwt', token, {maxAge: maxAge * 1000, httpOnly: true});
            return res.status(200).json({user});
        }catch(err){

           return res.status(400).json({loginErrorMessage: err.massage});
        }
    };

    export const updateUser = (req, res) => {
        
    }
