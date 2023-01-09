import {Router} from 'express';
import {updateUser, updateUserInfo, deleterUser} from '../controllers/userControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js'

const router = Router();

// update a user
router.put('/:id',userAuth, updateUser);
router.put('/info/update/:id',userAuth, updateUserInfo);
// delete a user
router.delete('/delete/:id',userAuth, deleterUser);
// get a user
// follow a user
// unfollow a user

export default router;