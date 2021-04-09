import React, { useState, useEffect, useContext } from 'react'
import { incLikePost, disLikePost, postComment, deletePost } from '../actions/auth';
import { userContext } from '../App';
import { Link } from 'react-router-dom';
const Card = (props) => {
    const data = props.data;
    const setData = props.setData;
    props = props.value;
    // console.log("Props in cards======>",props)

    const { state, dispatch } = useContext(userContext);
    const [textComment, setComment] = useState("");
    // const [noOfLikes, setNoOfLike] = useState(props.likes.length);
    // const [likesArray, setLikesArray] = useState(props.likes);



    const likePost = async (id) => {
        try {
            const res = await incLikePost(id);
            // setNoOfLike(res.data.user.likes.length);

            const newData = data.map((item) => {
                if (item._id === res.data.user._id) {
                    return res.data.user;
                }
                else {
                    return item;
                }
            })
            setData(newData);
            // setLikesArray(res.data.user.likes);
            console.log("LikePost Response =====>", res);

        } catch (err) {
            console.log(err);
        }
    }
    const disLikePost1 = async (id) => {
        try {
            const res = await disLikePost(id);
            // setLikesArray(res.data.user.likes);
            // setNoOfLike(res.data.user.likes.length);
            const newData = data.map((item) => {
                if (item._id === res.data.user._id) {
                    return res.data.user;
                }
                else {
                    return item;
                }
            })
            setData(newData);
            console.log("disLikePost Response =====>", res);
        } catch (err) {
            console.log(err);
        }
    }
    const makeComment = async (id) => {
        try {
            const res = await postComment({ id, textComment });
            console.log("Comment REsponse=====>", res)
            // setLikesArray(res.data.user.likes);
            // setNoOfLike(res.data.user.likes.length);
            const newData = data.map((item) => {
                if (item._id === res.data.user._id) {
                    return res.data.user;
                }
                else {
                    return item;
                }
            })
            setData(newData);
            console.log("Make Comment", res);
        } catch (err) {
            console.log("Error in card Comment", err);
        }
    }
    const deletePost1 = async (postId) => {
        try {
            const res = await deletePost(postId);
            console.log("Delete Response=====>", res)
            // setLikesArray(res.data.user.likes);
            // setNoOfLike(res.data.user.likes.length);
            const newData = data.filter((item) => {
                return item._id !== res.data.result._id;
                // return item.postedBy._id!==state._id;
            });

            setData(newData);
        } catch (err) {
            console.log("Error in card Comment", err);
        }
    }
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log("Post Comment");
        await makeComment(props._id);
    }
    return (
        <div className="myHome">
            <div className="card myHomeCard">
                <h5>
                    <Link to={(state._id !== props.postedBy._id) ? ("/profile/" + props.postedBy._id) : ("/profile")}>{props.postedBy.name}</Link>
                    
                    {(state._id === props.postedBy._id)
                        && (<i onClick={() => { deletePost1(props._id) }} className="material-icons " style={{ float: "right", }}>delete</i>)}
                </h5>
                <div className="card-image">
                    <img src={props.photoUrl} alt="" />
                </div>
                <i className="material-icons myRed">favorite</i>

                {props.likes.includes(state._id) ?
                    <i onClick={() => { disLikePost1(props._id) }} className="material-icons ">thumb_down</i>
                    :
                    <i onClick={() => { likePost(props._id) }} className="material-icons ">thumb_up</i>
                }
                <div className="card-content">
                    <h6>{props.likes.length} Likes</h6>
                    {/* <h6>{noOfLikes  } Likes</h6> */}
                    <h6>{props.title}</h6>
                    <p>{props.body}</p>

                    {
                        props.comments.map((record) => {
                            return (
                                <>
                                    <h6 ><span><b>{record.postedBy.name}</b></span> {record.text}</h6>
                                </>
                            )
                        })
                    }

                    <div className="row">
                        <div className="col s10">
                            <input onChange={(e) => { setComment(e.target.value); }} type="text" value={textComment} placeholder="Comment" />
                        </div>
                        <div className="col s2">
                            <div className="myPadding">
                                <button onClick={(e) => handleSubmitComment(e)} disabled={!textComment} className="btn waves-effect waves-light white" style={{ color: "black" }}>
                                    <i className="material-icons">comment</i> </button>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Card
