/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from 'react-moment';
import 'moment-timezone';
import { useNavigate } from  "react-router-dom";
import { toast } from "react-toastify";
import { getOrders } from "../store/actions/data";

const Profile = () => {
  const { user, isAuth } = useSelector((e) => e.AuthReducer);
  const dispatch = useDispatch();
  const { orders } = useSelector((e) => e.DataReducer);
  const naviagete = useNavigate();
  useEffect(() => {
    if (!isAuth && !localStorage.getItem("token")) {
      toast.error("בצע התחברות לאתר");
      naviagete("/login");
    }
  }, [isAuth, naviagete]);

  useEffect(() => {
    if (orders.length < 1) {
      dispatch(getOrders());
      return;
    }
  }, [orders]);
  return (
    <div className="profile-page">
      <div className="container">
        <h2> היי {user.name}👋</h2>
        <h3>ההזמנות שלך</h3>
        <div className="orders">
          {orders.map((order) => (
            <div className="order" key={order._id}>
              <div className="top">
                <h3>Order ID: {order._id}</h3>
                <p>Date: <Moment fromNow>{order.createdAt}</Moment> </p>
              </div>
              <div className="status">
                <p>Status: {order.status}</p>
                <p>Total: ${order.amount}</p>
              </div>
              <div className="bottom">
                <div className="shipping">
                  <p>
                    <strong>Shipping address:</strong>
                  </p>
                  <br />
                  <p>
                    {order.address.fname} {order.address.lname}
                  </p>
                  <p>{order.address.address}</p>
                  <p>
                    {order.address.city}, {order.address.state} {order.address.zip}
                  </p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.email}</p>
                  <br />
                  <p className="pMethod">
                    <strong>Payment method:</strong>
                    <span>{order.paymentMethod}</span>
                  </p>
                </div>
                <div className="products">
                  <p>
                    <strong>Products:</strong>
                  </p>
                  <br />
                  <ol>
                    {order.products.map((product) => (
                      <li key={product._id}>
                        <p>
                          {product.name} x {product.count}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
