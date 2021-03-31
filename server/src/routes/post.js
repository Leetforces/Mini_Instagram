import express from 'express';
const router = express.Router();

//importing controllers
import {createPost} from '../controllers/post';
import {requireSignin} from '../middleware/index';


router.post('/createPost',requireSignin,createPost);

module.exports = router;