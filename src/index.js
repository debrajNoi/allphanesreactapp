import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
// css 
import './assets/css/pages/auth.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/pages/profile.css'
import './assets/css/navbar.css'
// pages 
import Layout from "./views/pages/Layout"
import Registration from './views/pages/Registration'
import OtpVerification from './views/pages/OtpVerification'
import Login from './views/pages/Login'
import ProfileLayout from './views/pages/ProfileLayout'
import Images from './views/images'
import Terms from './views/pages/Terms'
import Privacy from './views/pages/Privacy'
import Notfound from './views/pages/Notfound'
import Index from './views/Index'
import Home from './views/pages/Home'
import App from './components/Modals/demo'
import Members from './views/pages/Members'
import RequestList from './views/pages/RequestList'
import Demo from './views/pages/Demo'
import SendingList from './views/pages/SendingList'
import FriendsList from './views/pages/FriendsList'
import Gellarys from './views/pages/Gellary'
import UserProfile from './views/pages/UserProfile'
// import PrivateOutlet from './_helpers/PrivateOutlet'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<Index />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path='terms' element={<Terms />} />
        <Route path='privacy' element={<Privacy />} />
        <Route path="images" element={<Images />} />
        
        <Route path="demo" element={<App />} />
        <Route path="*" element={<Notfound />} />
        <Route path="demos" element={<Demo />} />

        {/* private Route  */}
        <Route path="profile" element={<ProfileLayout />} />
        <Route path="members" element={<Members />} />
        <Route path="request-list" element={<RequestList />} />
        <Route path="sent-list" element={<SendingList />} />
        <Route path="friends-list" element={<FriendsList />} />
        <Route path="photo-gellary" element={<Gellarys />} />
        <Route path="user-profile/:id" element={<UserProfile />} />

      </Route>
      <Route path="/auth" element={<Layout />} >
          <Route index element={<Login />}/>
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="verification" element={<OtpVerification />} /> {/* private route */}
        </Route>
      

      {/* <Route path="/*" element={<PrivateOutlet />} >
        <Route path="profile" element={<Profile />} />
      </Route> */}
      

    </Routes>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
