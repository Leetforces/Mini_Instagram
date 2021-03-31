import Post  from '../models/post';
import jwt from 'jsonwebtoken';

export const createPost = async(req,res)=>{
    const {title,body}= req.body;
    if(!title || !body){
        return res.status(400).send("Please Add all the fields.");
    }

    try {
        const post = new Post({
            title,
            body,
            postedBy: req._id,
        });
        await post.save();
        return res.json({ OK: true })

    } catch (error) {
        console.log(error);
        return res.status(400).send("Error. Try Again.");
    }
}