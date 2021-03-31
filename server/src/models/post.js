import  mongoose from 'mongoose';
const {ObjectId} =mongoose.Schema.Types;

const postSchema= new mongoose.Schema({
   title:{
       type:String,
       required:"Title is Required",
   },
   body:{
       type:String,
       required:"Body must be filled."

   },
   photo:{
       type:String,
       default:"no photo",
   },
   postedBy:{
       type: ObjectId,
       ref:"User",
   }
    
},{timestamps:true});


// here post is a collection
export default mongoose.model("Post",postSchema);