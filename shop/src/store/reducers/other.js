import { TOGGLE_CART } from "../constants";

const initState = {
    cartOpen: false,
}

const OtherReducer = (state = initState, action) => {
    if(action.type === TOGGLE_CART){
        return {...state, cartOpen:action.payload};
    }
    return state;
}

export default OtherReducer;