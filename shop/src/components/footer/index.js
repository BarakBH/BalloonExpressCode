/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import paymentMethods from '../../images/payment.png';
import { GrFacebookOption, GrInstagram } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="container">
        <div className="top">
          <div className="payment-methods">
            <img src={paymentMethods} alt="payment methods" />
            <h4>שיטות תשלום</h4>
          </div>
          <div className="social">
            <ul className="social-links">
              <li><a className='fb' href="https://www.facebook.com/Balon-express-1541560769431700/" target='_blank'><GrFacebookOption /></a></li>
              <li><a className='insta' href="https://www.instagram.com/balon_express" target='_blank'><GrInstagram /></a></li>
            <h4>עקבו אחרינו גם ב</h4>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <p>  <Link to="/">Balloon Express</Link>כל הזכויות שמורות ל ©</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer