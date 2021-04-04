import Post  from '../models/post';

export const getAllPost=async(req,res)=>{
   try{
       const result= await Post.find().populate("postedBy","_id name").exec();
       res.json({
          data: result,
       })

   }catch(err){
       return res.json({
           error:err,
       });
   }
}
export const getMyPost=async(req,res)=>{
   try{
       console.log("ID: ",req._id);
       const result= await Post.find({postedBy:req._id}).populate("postedBy","_id name").exec();
       res.json({
           data:result,
       })

   }catch(err){
       return res.json({
           error:err,
       });
   }
}
export const createPost = async(req,res)=>{
    const {title,body,photoUrl}= req.body;
    if(!title || !body || !photoUrl){
        return res.status(400).send("Please Add all the fields.");
    }

    try {
        const post = new Post({
            title,
            body,
            photoUrl,
            postedBy: req._id,
        });
        await post.save();
        return res.json({ OK: true })

    } catch (error) {
        console.log(error);
        return res.status(400).send("Error. Try Again.");
    }
}