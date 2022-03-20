import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Layout from "./views/pages/Layout"


// css 
import './assets/css/pages/auth.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to="/registration" />} />
      <Route path="/otp-verification" element={<Layout />} />
      <Route path="/registration" element={<Layout />} />
      <Route path="/login" element={<Layout />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
