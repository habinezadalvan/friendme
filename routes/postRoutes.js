import {Router} from 'express';
import {createPost} from '../controllers/postControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';

const router = Router();

router.use('*', userAuth);
router.post('/create', createPost);
//update a post
// delete a post
// like a post
// get a post
// get timeline posts

export default router;