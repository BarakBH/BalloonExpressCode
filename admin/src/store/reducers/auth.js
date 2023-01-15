import {SET_USER, AUTH_LOADING_ON, AUTH_LOADING_OFF, LOGOUT} from "../constants";

const initState = {
    user:{},
    isAuth:false,
    isLoading:false
}

const AuthReducer = (state = initState, action) => {
    if(action.type === SET_USER){
        return {...state, user:action.payload, isAuth:true};
    }
    if(action.type === AUTH_LOADING_ON){
        return {...state, isLoading:true};
    }
    if(action.type === AUTH_LOADING_OFF){
        return {...state, isLoading:false};
    }
    if(action.type === LOGOUT){
        return {...state,user:{},isAuth:false};
    }
    return state;
}

export default AuthReducer;