import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import axios from "../utils/axios";
import {
  AUTH_LOADING_ON,
  AUTH_LOADING_OFF,
  SET_USER,
} from "../store/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const { isLoading } = useSelector((e) => e.AuthReducer);
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    if(state.password !== state.confirmPassword){
      toast.error("הסיסמאות לא תואמות")
      return
    }

    if(state.password.length < 6){
      toast.error("סיסמא חייבת להיות לפחות עם 6 תווים")
      return
    }
    
    e.preventDefault();
    dispatch({ type: AUTH_LOADING_ON });
    try {
      const { data } = await axios.post("/api/register", state);
      localStorage.setItem("token", data?.token || null);
      toast.success("משתמש נרשם בהצלחה !");
      toast.success("ברוך הבא לחנות");
      window.location.href = 'main';
      dispatch({ type: SET_USER, payload: data?.user || null });
      dispatch({ type: AUTH_LOADING_OFF });
    } catch (error) {
      dispatch({ type: AUTH_LOADING_OFF });
      if (error.response) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
    }
  };
  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>הרשמה לאתר</h2>
        <div className="form-group">
          <label htmlFor="email">הכנס שם</label>
          <input
            type="name"
            name="name"
            value={state.name}
            required
            onChange={(e) => setstate({ ...state, name: e.target.value })}
            id="name"
            placeholder="פלוני אלמוני"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">הכנס אימייל</label>
          <input
            type="email"
            name="email"
            value={state.email}
            required
            onChange={(e) => setstate({ ...state, email: e.target.value })}
            id="email"
            placeholder="example@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">בחר סיסמה</label>
          <input
            type="password"
            required
            value={state.password}
            name="password"
            id="password"
            placeholder="********"
            onChange={(e) => setstate({ ...state, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">בחר סיסמה שנית</label>
          <input
            type="password"
            required
            value={state.confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            onChange={(e) =>
              setstate({ ...state, confirmPassword: e.target.value })
            }
          />
        </div>
        {isLoading ? (
          <button type="button" className="btn" disabled>
            <Loader />
          </button>
        ) : (
          <button type="submit" className="btn">
            הרשמו עכשיו
          </button>
        )}
        <p className="bottom">
          כבר יש לי משתמש ! <Link to="/login">התחברות</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
