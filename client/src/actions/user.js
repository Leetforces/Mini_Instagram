import axios from 'axios';

export const getProfileOfGivenId = async (userId) => {
    const token = localStorage.getItem("jwt");

    //for params there is no body
    const res = await axios.get(`${process.env.REACT_APP_API}/profile/${userId}` ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const follow = async (followId) => {
    console.log("Follow Id=======>",followId);
    const token = localStorage.getItem("jwt");

    const res = await axios.put(`${process.env.REACT_APP_API}/follow`,{followId} ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const unFollow = async (unFollowId) => {
    const token = localStorage.getItem("jwt");

    const res = await axios.put(`${process.env.REACT_APP_API}/unfollow`,{unFollowId} ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
