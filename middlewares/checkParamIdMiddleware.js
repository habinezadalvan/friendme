import {isValidObjectId} from 'mongoose';

export const checkParamId = (req, res, next) => {
    const {id} = req.params;
    return !isValidObjectId(id) 
    ? res.status(400).json({message: 'Sorry the id is invalid.'})
    : next();
}