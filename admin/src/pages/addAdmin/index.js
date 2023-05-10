import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import axios from "../../utils/axios";
import {
  AUTH_LOADING_ON,
  AUTH_LOADING_OFF,
  SET_USER,
} from "../../store/constants";
import { toast } from "react-toastify";

const AddAdmin = () => {
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
      toast.error("סיסמה אינה תואמת")
      return
    }

    if(state.password.length < 6){
      toast.error("סיסמה חייבת להיות מינימום של 6 תוויםs")
      return
    }
    
    e.preventDefault();
    dispatch({ type: AUTH_LOADING_ON });
    try {
      const { data } = await axios.post("/api/adminRegister", state);
      localStorage.setItem("token", data?.token || null);
      toast.success("אדמין חדש נוסף");
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
        <h2>הוספת משתמש אדמין חדש</h2>
        <div className="form-group">
          <label htmlFor="email">הכנס שם</label>
          <input
            type="name"
            name="name"
            value={state.name}
            required
            onChange={(e) => setstate({ ...state, name: e.target.value })}
            id="name"
            placeholder="אדמין אדמין"
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
            placeholder="admin@admin.com"
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
            הוספה לרשימת האדמינים
          </button>
        )}
      </form>
    </div>
  );
};

export default AddAdmin;
