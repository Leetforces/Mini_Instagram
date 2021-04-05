import express from 'express';
const router = express.Router();

//importing controllers
import {createPost,getAllPost,getMyPost,incLike,disLike,insertComment,deletePost} from '../controllers/post';
import {requireSignin} from '../middleware/index';


router.get('/allPost',requireSignin,getAllPost);
router.get('/myPost',requireSignin,getMyPost);
router.post('/createPost',requireSignin,createPost);
router.put('/like',requireSignin,incLike);
router.put('/dislike',requireSignin,disLike);
router.put('/comment',requireSignin,insertComment);
router.delete('/deletePost/:postId',requireSignin,deletePost);

module.exports = router;