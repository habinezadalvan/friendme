import validator from 'validator';
import moment from 'moment';
import User from '../models/userModel.js';
import Info from '../models/userInfoModel.js';
import {databaseErrorHandlingFunction} from '../helpers/dbErrorsHandlerHelper.js';
import {createToken} from '../helpers/createToken.js'


    const maxAge = 2 * 24 * 60 * 60;

 export const signUp = async(req, res) =>{
        const {username, email, password, dateOfBirth} = req.body;

        const userDateOfBirth = new Date(dateOfBirth);
        const todayDate = moment(Date.now());
        const userAge = todayDate.diff(userDateOfBirth, 'years', true).toFixed(1);

      
       try{
        const user = await User.create({
            username,
            email,
            password,
            dateOfBirth: moment(dateOfBirth),
            age: userAge,
        });


        if(user){
            const token = await createToken(user, maxAge);
            res.cookie('jwt', token, {maxAge: maxAge * 1000, httpOnly: true});
            const  {password, ...rest} = user._doc;
            await Info.create({userId: user._id});
            return res.status(201).json({rest});
        }

       }catch(error) {
        const errors = databaseErrorHandlingFunction(error);
        return res.status(400).json(errors);
       }
    };

    export const logIn = async (req, res) => {
        const {password, username} = req.body;
        const userCridentials = {
            email: '',
            username: '',
            password
        };

        validator.isEmail(username) ? userCridentials.email = username : userCridentials.username = username;

        try{
            const user = await User.login(userCridentials);
            const {password, ...rest} = user._doc;
            const token = await createToken(user, maxAge);
            res.cookie('jwt', token, {maxAge: maxAge * 1000, httpOnly: true});
            return res.status(200).json({rest});
        }catch(err){
           return res.status(400).json({loginErrorMessage: err.massage});
        }
    };

    export const logOut = (req, res) => {
        res.cookie('jwt', '', {maxAge: 1});
        return res.status(200).json({message: `You are logged out.`});
    }

