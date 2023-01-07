import User from '../models/userModel.js';
import {hashPassword} from '../utils/passwordUtils.js';
import {databaseErrorHandlingFunction} from '../helpers/userHelpers.js'

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {password} = req.body;
   try{
    if(req.userId !== id) return res.status(401).json({message: `You can only update your account.`});
    if(password) {
        req.body.password = await hashPassword(password);
    };
   
    const user = await User.findByIdAndUpdate(id, {$set:req.body}, {new: true});

    return res.status(200).json(user);

   }catch(err) {
    const errors = databaseErrorHandlingFunction(err);

    return res.status(400).json(errors);
   }

}
