import React, { useEffect, useState, useContext } from 'react'
import { getProfileOfGivenId } from '../../actions/user'
import { userContext } from '../../App';
import { follow, unFollow } from '../../actions/user'

import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [userProfileData, setUserProfileData] = useState([]);
    const { state, dispatch } = useContext(userContext);
    const { userId } = useParams();
    // console.log("USERID=====> ", userId);
    // console.log("State==========>", state);
    const followUser = async (followId) => {
        try {
            const result = await follow(followId);
            console.log(result);
            dispatch({
                type: "UPDATE",
                payload: {
                    following: result.data.user.following,
                    followers: result.data.user.followers,
                }
            });
            localStorage.setItem("user", JSON.stringify(result.data.user));

            //Alternative of below method, we can also directly send data  of followUser from server /follow and update here
            setUserProfileData((prevState) => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: [...prevState.user.followers, result.data.user._id]
                    },

                }
            })
        } catch (err) {
            console.log("followUser Profile Error===>", err);
        }
    }
    const unFollowUser = async (unFollowId) => {
        try {
            const result = await unFollow(unFollowId);
            console.log(result);
            dispatch({
                type: "UPDATE",
                payload: {
                    following: result.data.user.following,
                    followers: result.data.user.followers,
                }
            });
            localStorage.setItem("user", JSON.stringify(result.data.user));
            setUserProfileData((prevState) => {
                const newFollowers = prevState.user.followers.filter((id) => {
                    return id !== state._id;
                })
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: newFollowers,
                    },

                }
            })
        } catch (err) {
            console.log("unFollowUser Profile Error===>", err);
        }
    }
    useEffect(() => {
        const getProfile = async (userId) => {
            try {
                const res = await getProfileOfGivenId(userId);
                console.log("Res.data=============>", res.data);
                await setUserProfileData(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        //call async function
        getProfile(userId);
        console.log("userProfileData=============>", userProfileData);
    }, []);   //[] for 1 time Execute otherwise it go call infinite 
    return (
        <>
            {
                (userProfileData && userProfileData.user && userProfileData.post && userProfileData.user.name && userProfileData.user.email) ? (
                    <>
                        <div style={{ maxWidth: "850px", margin: "0px auto" }}>
                            <div className="myProfile">
                                <div>
                                    <img src="https://source.unsplash.com/user/erondu/1600x900" alt="PhotoImg" className="myImg" />
                                </div>
                                <div>
                                    <h4>{userProfileData.user.name}</h4>
                                    <h6>{userProfileData.user.email}</h6>
                                    <div className="myProfile1">
                                        <h6 className="myPadding1">{userProfileData.post.length} posts</h6>
                                        <h6 className="myPadding1">{userProfileData.user.followers.length} followers</h6>
                                        <h6 className="myPadding1">{userProfileData.user.following.length} following</h6>
                                    </div>
                                    {
                                        (userProfileData.user.followers.includes(state._id)) ?
                                            (<div style={{ display: "flex",  justifyContent: "center", marginBottom:"20px", }}><button onClick={() => { unFollowUser(userId); }} className="btn waves-effect waves-light white" style={{ color: "black" }}>unfollow</button></div>) :
                                            (<div style={{ display: "flex", justifyContent: "center",marginBottom:"20px", }}><button onClick={() => { followUser(userId); }} className="btn waves-effect waves-light white" style={{ color: "black" }}>follow</button></div>)
                                    }

                                </div>
                            </div>

                        </div>
                        {
                            userProfileData.post.map((item) => {
                                return (
                                    <img key={item._id} className="myImg1 myPadding1" src={item.photoUrl} alt={item.title} />
                                )
                            })
                        }
                    </>
                ) : (<h1>Loading...</h1>)
            }
        </>
    )
}

export default UserProfile;


/*

*/