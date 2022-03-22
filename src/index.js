import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
// css 
import './assets/css/pages/auth.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/pages/profile.css'
import './assets/css/navbar.css'
// pages 
import Layout from "./views/pages/Layout"
import Profile from './views/pages/Profile';
import Registration from './views/pages/Registration';
import OtpVerification from './views/pages/OtpVerification';
import Login from './views/pages/Login';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Login />}/>
        <Route path="otp-verification" element={<OtpVerification />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
