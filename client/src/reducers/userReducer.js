export const initialState= null;
export const userReducer = (state,action)=>{
    if(action.type==="LOGIN_USER"){
        return action.payload;
    }else if(action.type==="LOGOUT"){
       return null; 
    }else if(action.type==="UPDATE"){
        return {
            ...state,
            followers:action.payload.followers,
            following:action.payload.following,
        }
    }
    else if(action.type==="UPDATEPIC"){
        return {
            ...state,
            picUrl:action.payload.picUrl,
        }
    }
    return state;
}