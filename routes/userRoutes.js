import {Router} from 'express';
import {updateUser, updateUserInfo, deleterUser, getUser, followUser, unfollowUser, searchUser} from '../controllers/userControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';
import {checkParamId} from '../middlewares/checkParamIdMiddleware.js'

const router = Router();


router.use('*', userAuth); // Authenticates the routes bellow.
router.get('/search/:key', searchUser)
router.get('/:id', checkParamId, getUser);
router.put('/:id', checkParamId,updateUser);
router.put('/info/update/:id',checkParamId, updateUserInfo);
router.put('/follow/:id', checkParamId, followUser);
router.put('/unfollow/:id', checkParamId, unfollowUser);
router.delete('/delete/:id', checkParamId,deleterUser);


export default router;