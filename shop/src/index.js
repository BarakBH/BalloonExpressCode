import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css/navigation';
import './style/index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
