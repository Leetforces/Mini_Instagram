import User from '../models/user';
import Post from '../models/post';

export const allPostForGivenId = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId }).select("-password");
        console.log("USER in allPostForgivenId======>", user);
        if (user) {
            const post = await Post.find({ postedBy: req.params.userId }).populate("postedBy", "_id name").exec();
            console.log("USER=========>", post)
            res.json({ user, post });
        }

    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
}

export const follow = async (req, res) => {
    const followId = req.body.followId;
    console.log("FollowId",followId);
    console.log("UserId",req._id);
    try {
        const followUser = await User.findByIdAndUpdate(followId, {
            $push: { followers: req._id }
        }, { new: true }).select("-password");

        if (followUser) {
            const user = await User.findByIdAndUpdate(req._id, {
                $push: { following: followId }
            }, { new: true }).select("-password");
            res.json({user});
        }
    } catch (err) {
        console.log("Error in follow:", err);
        res.status(422).json({ error: err });
    }

}

export const unFollow = async (req, res) => {
    const unFollowId = req.body.unFollowId;
    try {
        const unFollowUser = await User.findByIdAndUpdate(unFollowId, {
            $pull: { followers: req._id }
        }, { new: true });

        if (unFollowUser) {
            const user = await User.findByIdAndUpdate(req._id, {
                $pull: { following: unFollowId }
            }, { new: true });
            res.json({user});
        }
    } catch (err) {
        console.log("Error in follow:", err);
        res.status(422).json({ error: err });
    }
}
export const updatePic = async (req, res) => {
    const id=req._id;
    try {
        const user = await User.findByIdAndUpdate(id, {
            $set:{picUrl:req.body.picUrl},
        }, { new: true }).select("-password");
        
       res.json(user);
      
    } catch (err) {
        console.log("Error in Update Profile Picture:", err);
        res.status(422).json({ error: err });
    }
}