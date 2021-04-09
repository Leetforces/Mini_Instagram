import axios from 'axios';

export const getProfileOfGivenId = async (userId) => {
    const token = localStorage.getItem("jwt");

    //for params there is no body
    const res = await axios.get(`/api/profile/${userId}` ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const follow = async (followId) => {
    console.log("Follow Id=======>",followId);
    const token = localStorage.getItem("jwt");

    const res = await axios.put(`/api/follow`,{followId} ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const unFollow = async (unFollowId) => {
    const token = localStorage.getItem("jwt");

    const res = await axios.put(`/api/unfollow`,{unFollowId} ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const updatePicInDatabase = async (picUrl) => {
    const token = localStorage.getItem("jwt");

    const res = await axios.put(`/api/updatePic`,{picUrl} ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const searchUser = async (query) => {
    const token = localStorage.getItem("jwt");

    const res = await axios.post(`/api/search`,{query} ,{
        headers: {
            authorization: token,
        }
    });
    return res;
}
