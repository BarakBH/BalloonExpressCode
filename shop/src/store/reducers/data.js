import { SET_PRODUCTS, SET_CATEGORIES, LOADING, SET_CART, SET_ORDERS } from "../constants";

const initState = {
    products: [],
    loading: false,
    categories: [],
    cart: [],
    orders: []
}

const OtherReducer = (state = initState, action) => {
    if(action.type === SET_PRODUCTS){
        return {...state, products:action.payload};
    }
    if(action.type === LOADING){
        return {...state, loading:action.payload};
    }
    if(action.type === SET_CATEGORIES){
        return {...state, categories:action.payload};
    }
    if(action.type === SET_CART){
        return {...state, cart:action.payload};
    }

    if(action.type === SET_ORDERS){
        return {...state, orders:action.payload};
    }
    return state;
}

export default OtherReducer;