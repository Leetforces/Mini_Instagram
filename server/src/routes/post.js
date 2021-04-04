import express from 'express';
const router = express.Router();

//importing controllers
import {createPost,getAllPost,getMyPost} from '../controllers/post';
import {requireSignin} from '../middleware/index';


router.get('/allPost',requireSignin,getAllPost);
router.get('/myPost',requireSignin,getMyPost);
router.post('/createPost',requireSignin,createPost);

module.exports = router;