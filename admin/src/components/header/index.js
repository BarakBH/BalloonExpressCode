/* eslint-disable no-unused-vars */
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../store/constants';
import { FiMenu } from "react-icons/fi";

const HeaderAdmin = ({ setshowSidebar, showSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT});
    navigate('/login')
  }
  return (
    <div className="admin__header">
      <div>
        <button onClick={() => setshowSidebar(!showSidebar)} className="sidebar-toggle"><FiMenu className="icon" /></button>
      </div>
      <div className="header-right">
        <button className="notifications-button">
          <MdNotifications className="icon" />
        </button>
        <button className="user-dropdown">
          <FaUserCircle className="icon" />
          <ul className="menu">
            <li><Link onClick={logout} to="#">התנתקות</Link></li>
          </ul>
        </button>
      </div>
    </div>
  );
};

export default HeaderAdmin;
