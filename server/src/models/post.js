import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is Required",
    },
    body: {
        type: String,
        required: "Body must be filled."

    },
    photoUrl: {
        type: String,
        default: "no photo",
    },
    likes: [{
        type: ObjectId,
        ref: "User",
    }],

    postedBy: {
        type: ObjectId,
        ref: "User", //must to populate
    },
    comments: [{
        text: {
            type: String,
        },
        postedBy: {
            type: ObjectId,
            ref: "User", //must to populate
        },
    }]

}, { timestamps: true });


// here post is a collection
export default mongoose.model("Post", postSchema);