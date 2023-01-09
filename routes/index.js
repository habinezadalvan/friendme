import {Router} from 'express';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import postRoutes from '../routes/postRoutes.js';

 const router = Router();

 router.use('/auth', authRoutes);
 router.use('/users', userRoutes);
 router.use('/posts', postRoutes);

 export default router;