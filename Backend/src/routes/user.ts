import { Router } from 'express';
import { signupHandler } from '../controllers/signupHandler';
import { signinHandler } from '../controllers/signinHandler'
import { contentHandler } from '../controllers/contentHandler';
import { viewContentHandler } from '../controllers/viewContentHandler';
import { deleteHandler } from '../controllers/deleteHandler';
import { shareHandler } from '../controllers/shareHandler';
import { shareLinkHandler } from '../controllers/shareLinkHandler';
import { upload, uploadHandler } from '../controllers/uploadHandler';
import {auth} from '../middleware/auth'
export const userRouter = Router();


userRouter.post('/signup', signupHandler);
userRouter.post('/signin', signinHandler);
userRouter.post('/content', auth, contentHandler);
userRouter.get('/content', auth, viewContentHandler);
userRouter.delete('/content', auth, deleteHandler);
userRouter.post('/brain/share', auth, shareHandler);
userRouter.get('/brain/:shareLink', auth, shareLinkHandler);
userRouter.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadHandler);