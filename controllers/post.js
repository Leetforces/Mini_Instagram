import Post from '../models/post';
import User from '../models/user';
export const getAllPost = async (req, res) => {
    try {
        const result = await Post.find().populate("postedBy", "_id name").populate("comments.postedBy", "_id name").exec();
        res.json({
            data: result,
        })

    } catch (err) {
        return res.json({
            error: err,
        });
    }
}
export const getAllFollowingPost = async (req, res) => {
    const id=req._id;
    console.log("USERID in GETAllFollowing Post:",id);
    try {
        const user=await User.findOne({_id:id});
        const result = await Post.find({postedBy:{$in:user.following}}).populate("postedBy", "_id name").populate("comments.postedBy", "_id name").exec();
        console.log("Result in allfollowingPost",result);
        res.json({
            data: result,
        })

    } catch (err) {
        return res.json({
            error: err,
        });
    }
}
export const getMyPost = async (req, res) => {
    try {
        console.log("ID: ", req._id);
        const result = await Post.find({ postedBy: req._id }).populate("postedBy", "_id name").exec();
        res.json({
            data: result,
        })

    } catch (err) {
        return res.json({
            error: err,
        });
    }
}
export const createPost = async (req, res) => {
    const { title, body, photoUrl } = req.body;
    if (!title || !body || !photoUrl) {
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

export const incLike = async (req, res) => {
    try {
        const postId = req.body.id;
        console.log("ID From incLike========>", postId);
        const user = await Post.findByIdAndUpdate({ _id: postId }, {
            $push: { likes: req._id }
        }, { new: true }).populate("comments.postedBy", "_id name").exec();

        console.log("Like SuccessFully");
        console.log("USER=======>", user);
        return res.json({
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }

}
export const disLike = async (req, res) => {
    try {
        const postId = req.body.id;
        console.log("ID From incLike========>", postId);
        const user = await Post.findByIdAndUpdate({ _id: postId }, {
            $pull: { likes: req._id }
        }, { new: true, useFindAndModify: false, }).exec();
        console.log("DisLike SuccessFully.");
        return res.json({
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }
}
export const insertComment = async (req, res) => {
    const postId = req.body.postId;
    const comment = {
        text: req.body.text,
        postedBy: req._id,
    }
    console.log("POSTID in insertComment:========>", postId);
    console.log("Comment in insertComment:========>", comment);
    try {


        const user = await Post.findByIdAndUpdate({ _id: postId }, {
            $push: { comments: comment }
        }, { new: true, useFindAndModify: false, }).populate("comments.postedBy", "_id name").populate("postedBy", "_id name").exec();
        console.log("User=============>", user);
        return res.json({
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }
}
export const deletePost = async (req, res) => {
    const postId = req.params.postId;
    console.log("Post id in deleteinsert===========>", postId);
    try {
        const post = await Post.findOne({ _id: postId }).populate("postedBy", "_id").exec();
        if (!post) {
            return res.send("Post Not Found");
        }
        else {
            if (post.postedBy._id.toString() === req._id.toString()) {
                const data = await post.remove();
                console.log("resPonse from deleltePost===========>", data);
                res.json({ result: data });
            }
        }


    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }
}