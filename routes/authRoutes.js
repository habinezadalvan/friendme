import {Router} from 'express';
import {signUp, logIn, logOut } from '../controllers/authControllers.js';
import {userAuth} from '../middlewares/authMiddleware.js';
 
 const router = Router();

 router.post('/signup', signUp);
 router.post('/login', logIn);
 router.get('/logout',userAuth, logOut);

 export default router;