import React from 'react';
import { FaShippingFast } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

const ShopDetail = () => {
  return (
    <div className='shop-detail'>
      <div className="container">
        <div className="shop-detail-wraapper">
          <div className="detail-box">
            <FaShippingFast className='icon' />
            <div className="info">
              <h6>משלוחים חינם</h6>
              <p>לכל ההזמנות מעל 200 שח</p>
            </div>
          </div>
          <div className="detail-box">
            <GiWorld className='icon' />
            <div className="info">
              <h6>מדיניות החזרות</h6>
              <p>החזרות ללקוח לא מרוצה עד 9 ימים</p>
            </div>
          </div>
          <div className="detail-box">
            <RiSecurePaymentFill className='icon' />
            <div className="info">
              <h6>תשלום מאובטח 100%</h6>
              <p>התשלום שלך בטוח איתנו</p>
            </div>
          </div>
          <div className="detail-box">
            <BiSupport className='icon' />
            <div className="info">
              <h6>תמיכה 24/7</h6>
              <p>צור איתנו קשר 24 שעות ביממה</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopDetail