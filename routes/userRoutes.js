import {Router} from 'express';
import {updateUser, updateUserInfo} from '../controllers/userControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js'

const router = Router();

// update a user
router.put('/:id',userAuth, updateUser);
router.put('/info/update/:id',userAuth, updateUserInfo);
// delete a user
// get a user
// follow a user
// unfollow a user

export default router;