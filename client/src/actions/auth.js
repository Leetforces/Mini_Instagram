import axios from 'axios';

export const register = async (user) => {
    console.log(process.env.REACT_APP_API);
    const res = await axios.post(`${process.env.REACT_APP_API}/register`, user);
    return res;
}
export const login = async (user) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/login`, user);
    return res;
}

export const uploadImage = async (data) => {
    const res = await axios.post(process.env.REACT_APP_IMAGE_API, data);
    return res;
}

export const createPost = async (data) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.post(`${process.env.REACT_APP_API}/createPost`, data, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const getAllPost = async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get(`${process.env.REACT_APP_API}/allPost`, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const getMyPost = async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get(`${process.env.REACT_APP_API}/myPost`, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const incLikePost = async (id) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(`${process.env.REACT_APP_API}/like`,{id,}, {
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const disLikePost = async (id) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(`${process.env.REACT_APP_API}/dislike`, {id,},{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const postComment = async (data) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.put(`${process.env.REACT_APP_API}/comment`, {postId:data.id,text:data.textComment},{
        headers: {
            authorization: token,
        }
    });
    return res;
}
export const deletePost = async (postId) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.delete(`${process.env.REACT_APP_API}/deletePost/${postId}`,{
        headers: {
            authorization: token,
        },
        postId:postId,
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