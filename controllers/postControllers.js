import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import {databaseErrorHandlingFunction} from '../helpers/dbErrorsHandlerHelper.js';
import {_404_Message, serverErrorMessage, forbidenMessage} from '../utils/responseMessagesUtils.js';

export const createPost = async (req, res) => {
    const {description, img} = req.body;
   
    try{
        const user = await User.exists({_id: req.userId});
        if(!user) return res.status(404).json({message: _404_Message('user')});
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
        if(!post ) return res.status(404).json({message: _404_Message('post')});
        if(post.userId.toString() !== req.userId) return res.status(403).json({message: forbidenMessage('update', 'post')});
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
        if(!post ) return res.status(404).json({message: _404_Message('post')});
        if(post.userId.toString() !== req.userId) return res.status(403).json({message: forbidenMessage('delete', 'post')});
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
        if(!post ) return res.status(404).json({message: _404_Message('post')});
        if(!post.likes.includes(req.userId)){
           await post.updateOne({$push: {likes: req.userId}});
           return res.status(200).json({message: 'Post has been liked'});
        }else{
            await post.updateOne({$pull: {likes: req.userId}});
           return res.status(200).json({message: 'Post has been disliked'});
        }
    }catch(err){
        return res.status(500).json({error: serverErrorMessage})
    }
};

export const getPost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id);
        if(!post ) return res.status(404).json({message: _404_Message('post')});
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json({error: serverErrorMessage})
    }
};

export const getTimelinePosts = async (req, res) => {
    const currentUserId = req.userId;
    try {
        const currentUser = await User.findById(currentUserId);
        const currentUserPosts = await Post.find({userId: currentUserId});
        const allFollowingsPosts = await Promise.all(
            currentUser.followings.map(followingId => {
                return Post.find({userId: followingId});
            }));
        return res.status(200).json(currentUserPosts.concat(...allFollowingsPosts));
    }catch(err) {
        return res.status(500).json({error: serverErrorMessage})
    }
};

export const userPosts = async (req, res) => {
    const {id} = req.params;
   try{
        const posts = await Post.find({userId: id});
        if(!posts) return res.status(404).json({message: _404_Message('post')});
        return res.status(200).json(posts);
   }catch(err){
    return res.status(500).json({error: serverErrorMessage})
   }
}


