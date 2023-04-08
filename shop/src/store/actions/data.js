import { SET_PRODUCTS, SET_CATEGORIES, LOADING, SET_CART, SET_ORDERS } from '../constants';
import axios from '../../utils/axios';

export const getProducts =  () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axios.get('/api/products');
    dispatch({
      type: SET_PRODUCTS,
      payload: data
    });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
}

export const getcategories =  () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axios.get('/api/categories');
    dispatch({
      type: SET_CATEGORIES,
      payload: data
    });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
}

export const getCart =  () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if(!cartProducts){
      dispatch({ type: LOADING, payload: false });
      return;
    }
    dispatch({
      type: SET_CART,
      payload: cartProducts
    });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
}

export const getOrders =  () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axios.get('/api/userOrders');
    dispatch({
      type: SET_ORDERS,
      payload: data
    });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
}