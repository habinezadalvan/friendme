import {Router} from 'express';
import {updateUser} from '../controllers/userControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js'

const router = Router();

// update a user
router.put('/:id',userAuth, updateUser);
// delete a user
// get a user
// follow a user
// unfollow a user

export default router;