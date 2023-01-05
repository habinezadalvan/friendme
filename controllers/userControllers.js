import User from '../models/userModel.js';
import {databaseErrorHandlingFunction} from '../helpers/userHelpers.js';


 export const signUp = async(req, res) =>{
        const {username, email, password} = req.body;
       try{
        const user = await User.create({
            username: username.replace(/\s/g, '').trim(),
            email,
            password,
        });

        res.status(200).json({user});
       }catch(error) {
       
        const errors = databaseErrorHandlingFunction(error);
        return res.status(400).json(errors);
       }
    }
