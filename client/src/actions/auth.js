import axios from 'axios';

export const register = async (user) => {
    console.log(process.env.REACT_APP_API);
    const res = await axios.post(`/api/register`, user);
    return res;
}
export const login = async (user) => {
    const res = await axios.post(`/api/login`, user);
    return res;
}
export const resetPassword = async (email) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.post(`/api/resetPassword`,{email});
    return res;
}

export const uploadImage = async (data) => {
    const res = await axios.post('https://api.cloudinary.com/v1_1/jadavpur-university/image/upload', data);
    return res;
}

export const createPost = async (data) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.post(`/api/createPost`, data, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const getAllPost = async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get(`/api/allPost`, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const getAllFollowingPost = async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get(`/api/allFollowingPost`, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const getMyPost = async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get(`/api/myPost`, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const incLikePost = async (id) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(`/api/like`, { id, }, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const disLikePost = async (id) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(`/api/dislike`, { id, }, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const postComment = async (data) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(`/api/comment`, { postId: data.id, text: data.textComment }, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const changePassword = async (password,token) => {
    const res = await axios.post(`/api/updatePassword`,{
        password,
        token,
    });
    return res;
}
export const deletePost = async (postId) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.delete(`/api/deletePost/${postId}`, {
        headers: {
            authorization: token,
        },
        postId: postId,
    });
    return res;
}
//update user in local storage
// export const updateUserInLocalStorage =(user,next)=>{
//     if(window.localStorage.getItem('auth')){
//         let auth=JSON.parse(localStorage.getItem('auth'));
//         auth.user=user;
//         localStorage.setItem("auth",JSON.stringify(auth));
//         next();
//     }
// }