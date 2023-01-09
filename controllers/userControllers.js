import moment from 'moment';
import User from '../models/userModel.js';
import Info from '../models/userInfo.js';

import {hashPassword} from '../utils/passwordUtils.js';
import {databaseErrorHandlingFunction} from '../helpers/userHelpers.js';


export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {password, dateOfBirth} = req.body;
    
   try{
    if(req.userId !== id) return res.status(401).json({message: `You can only update your account.`});
    if(password) {
        req.body.password = await hashPassword(password);
    };

    if(dateOfBirth) {
        const newAge = moment(Date.now()).diff(moment(dateOfBirth), 'years').toFixed(1);
        req.body.age = newAge;
    }
   
    const user = await User.findByIdAndUpdate(id, {$set:req.body}, {new: true, runValidators: true});

    return res.status(200).json(user);

   }catch(err) {
    const errors = databaseErrorHandlingFunction(err);
    return res.status(500).json(errors);
   }

};

export const updateUserInfo = async (req, res) => {

    const {id} = req.params;
    try{
        const userInfo = await Info.where('_id').equals(id.toString());
    
        if(!userInfo[0]) return res.status(404).json({message: 'User information not found.'});
        if(req.userId !== userInfo[0].userId.toString()) return res.status(401).json({message: `You're not authorized to update these information`});
        const updatedInfo = await Info.findByIdAndUpdate(id, {$set: req.body}, {new: true, runValidators: true});
        return res.status(200).json(updatedInfo);
    }catch(err){
        const errors = databaseErrorHandlingFunction(err);
        return res.status(500).json(errors);
    }
};

export const deleterUser = async(req, res) => {
    const {id} = req.params;

    try{
      const user = await User.findById(id);
      if (!user) return res.status(404).json({message: 'Sorry, account not found.'});
      if(req.userId !== user._id.toString()) return res.status(401).json({message: 'You can only delete your own account.'});
     await User.findByIdAndDelete(id, async (err) => {
        if(!err){
          return  await Info.deleteOne({userId: id});
         
        }
     }).clone().exec();
     res.cookie('jwt', '');
      return res.status(200).json({message: 'The account was successfully deleted, you can create a new one at any time, see you.'})
    }catch(err){
        return res.status(500).json({error: 'Sorry, there is a server error.'})
    }
};

export const getUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id);
      if (!user) return res.status(404).json({message: 'Sorry, account not found.'});
      const {password, ...rest} = user._doc;
      return res.status(200).json(rest);
    }catch(err){
        return res.status(500).json({error: 'Sorry, there is server error'});
    }
};

export const followUser = async (req, res) => {
    const {id: userToFollowId} = req.params;

    if(req.userId === userToFollowId) return res.status(403).json({message: `Sorry, you can not follow yourself.`});
    try{
        const user = await User.findById(userToFollowId);
        const currentUser = await User.findById(req.userId);
        if(!user || !currentUser ) return res.status(404).json({message: `Sorry, user not found.`})
        if(!user.followers.includes(req.userId)){
            await user.updateOne({$push: {followers: req.userId}});
            await currentUser.updateOne({$push: {followings: userToFollowId}});
            return res.status(200).json({message: `User has been followed.`})
        }else{
            return res.status(403).json({message: `You have already followed this user`});
        }
    }catch(err){
        return res.status(500).json({error: 'Sorry, there is a server error'});
    }
   
};

export const unfollowUser = async (req, res) => {
    const {id: userToUnfollowId} = req.params;

    if(req.userId === userToUnfollowId) return res.status(403).json({message: `Sorry, you can not unfollow yourself.`});
    try{
        const user = await User.findById(userToUnfollowId);
        const currentUser = await User.findById(req.userId);
        if(!user || !currentUser ) return res.status(404).json({message: `Sorry, user not found.`})
        if(user.followers.includes(req.userId)){
            await user.updateOne({$pull: {followers: req.userId}});
            await currentUser.updateOne({$pull: {followings: userToUnfollowId}});
            return res.status(200).json({message: `You unfollowed the user.`})
        }else{
            return res.status(403).json({message: `You do not followed this user`});
        }
    }catch(err){
        return res.status(500).json({error: 'Sorry, there is a server error'});
    }
}
