import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/auth";
import { composeWithDevTools } from 'redux-devtools-extension';

// Add all reducers
const rootReducers = combineReducers({
    AuthReducer
});

// middlewares
const middlewares = [thunkMiddleware]

// Create redux store
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;