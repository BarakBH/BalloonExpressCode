/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import {SET_USER} from '../store/constants';
import { useLocation, useNavigate } from "react-router-dom";

const Authorize = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {isAuth} = useSelector((e) => e.AuthReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuth){
      const token = localStorage.getItem('token');
      if(token){
        var { user } = jwt_decode(token);
        if(user){
          return dispatch({type: SET_USER, payload: user})
        }
      }
    }
    if(pathname !== '/login' && isAuth === false){
      navigate('/login');
    }
    if(pathname === '/login' && isAuth === true){
      navigate('/dashboard');
    }
  },[ isAuth, pathname, navigate ]);
  return null;
}

export default Authorize;