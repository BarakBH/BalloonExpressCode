import React from "react";
import ReactDOM from "react-dom";
import 'react-toastify/dist/ReactToastify.css';
import "react-quill/dist/quill.snow.css";
import "react-table-v6/react-table.css";
import "./assets/scss/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
