import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import {databaseErrorHandlingFunction} from '../helpers/dbErrorsHandlerHelper.js'

export const createPost = async (req, res) => {
    const {description, img} = req.body;
   
    try{
        const user = await User.exists({_id: req.userId});
        if(!user) return res.status(404).json({message: `User does not exist.`});
        const post = await Post.create({
            userId: user._id,
            description,
            img
        });
        return res.status(201).json(post);

    }catch(err){
console.log(err);
const errors = databaseErrorHandlingFunction(err);
return res.status(500).json(errors);
    }
}