import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/auth";
import OtherReducer from "./reducers/other";
import DataReducer from "./reducers/data";
import { composeWithDevTools } from 'redux-devtools-extension';

// Add all reducers
const rootReducers = combineReducers({
    AuthReducer,
    OtherReducer,
    DataReducer
});

// middlewares
const middlewares = [thunkMiddleware]

// Create redux store
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;