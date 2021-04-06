import express from 'express';
const router = express.Router();

//importing controllers
import {allPostForGivenId,follow, unFollow,updatePic} from '../controllers/user';
import {requireSignin} from '../middleware/index';


router.get('/profile/:userId',requireSignin,allPostForGivenId);
router.put('/follow',requireSignin,follow);
router.put('/unfollow',requireSignin,unFollow);
router.put('/updatePic',requireSignin,updatePic);


module.exports = router;