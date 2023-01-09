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
const errors = databaseErrorHandlingFunction(err);
return res.status(500).json(errors);
    }
};

export const updatePost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id);
        if(!post ) return res.status(404).json({message: 'Sorry, post not found.'});
        if(post.userId.toString() !== req.userId) return res.status(403).json({message: 'You can only update your own post.'});
        const newPost = await Post.findByIdAndUpdate(id, {$set: req.body}, {new: true, runValidators: true});
        return res.status(200).json(newPost);
    }catch(err){
        const errors = databaseErrorHandlingFunction(err);
        return res.status(500).json(errors);
    }
}
export const deletePost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id);
        if(!post ) return res.status(404).json({message: 'Sorry, post not found.'});
        if(post.userId.toString() !== req.userId) return res.status(403).json({message: 'You can only delete your own post.'});
        await post.deleteOne();
        return res.status(200).json({message: 'Post was deleted.'})
    }catch(err){
        const errors = databaseErrorHandlingFunction(err);
        return res.status(500).json(errors);
    }
};

export const likeDislikePost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id);
        if(!post ) return res.status(404).json({message: 'Sorry, post not found.'});
        if(!post.likes.includes(req.userId)){
           await post.updateOne({$push: {likes: req.userId}});
           return res.status(200).json({message: 'Post has been liked'});
        }else{
            await post.updateOne({$pull: {likes: req.userId}});
           return res.status(200).json({message: 'Post has been disliked'});
        }
    }catch(err){
        return res.status(500).json({error: 'Sorry, there is a server error.'})
    }
}
