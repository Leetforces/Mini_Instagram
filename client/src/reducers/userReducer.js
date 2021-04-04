export const initialState= null;
export const userReducer = (state,action)=>{
    if(action.type==="LOGIN_USER"){
        return action.payload;
    }else if(action.type==="LOGOUT"){
       return null; 
    }
    return state;
}