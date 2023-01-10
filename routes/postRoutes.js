import {Router} from 'express';
import {createPost, updatePost, deletePost, likeDislikePost, getPost, getTimelinePosts, userPosts} from '../controllers/postControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';
import {checkParamId} from '../middlewares/checkParamIdMiddleware.js'

const router = Router();

router.use('*', userAuth);
router.post('/create', createPost);
router.put('/update/:id',checkParamId, updatePost);
router.delete('/delete/:id',checkParamId, deletePost);
router.put('/:id',checkParamId, likeDislikePost);
router.get('/timeline/all', getTimelinePosts);
router.get('/:id/all',checkParamId, userPosts);
router.get('/:id',checkParamId, getPost);

// get timeline posts

export default router;