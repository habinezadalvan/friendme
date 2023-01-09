import {Router} from 'express';
import {createPost, updatePost} from '../controllers/postControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';
import {checkParamId} from '../middlewares/checkParamIdMiddleware.js'

const router = Router();

router.use('*', userAuth);
router.post('/create', createPost);
router.put('/update/:id',checkParamId, updatePost);

// delete a post
// like a post
// get a post
// get timeline posts

export default router;