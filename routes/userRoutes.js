import {Router} from 'express';
import {updateUser, updateUserInfo, deleterUser, getUser, followUser} from '../controllers/userControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';
import {checkParamId} from '../middlewares/checkParamIdMiddleware.js'

const router = Router();

// get a user
router.get('/:id', checkParamId, getUser);

router.use('*', userAuth); // Authenticates the routes bellow.
// update a user
router.put('/:id', checkParamId,updateUser);
router.put('/info/update/:id', checkParamId,updateUserInfo);
// follow user
router.put('/follow/:id', checkParamId, followUser);
// delete a user
router.delete('/delete/:id', checkParamId,deleterUser);
// follow a user
// unfollow a user

export default router;