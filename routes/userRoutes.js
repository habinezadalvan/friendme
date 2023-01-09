import {Router} from 'express';
import {updateUser, updateUserInfo, deleterUser, getUser} from '../controllers/userControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';
import {checkParamId} from '../middlewares/checkParamIdMiddleware.js'

const router = Router();

// get a user
router.get('/:id', checkParamId, getUser);
// update a user
router.put('/:id',userAuth, checkParamId, updateUser);
router.put('/info/update/:id',userAuth, checkParamId, updateUserInfo);
// delete a user
router.delete('/delete/:id',userAuth, checkParamId, deleterUser);
// follow a user
// unfollow a user

export default router;