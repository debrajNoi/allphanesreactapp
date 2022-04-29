import React from 'react'
import { Navigate } from 'react-router-dom'

import IndexNavbar from '../../components/Navbars/IndexNavbar'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import Profile from './Profile'

export default function ProfileLayout() {
    if(!localStorage.getItem('token')) return <Navigate to="/auth/login" />

    return (
        <>
            {/* <div className='navbar'>Nav bar</div> */}
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-3 col-md-3 left-bar-sec">
                       <LeftNavbar /> 
                    </div>
                    {/* Middle section  */}
                    <div className="col-lg-5 col-md-6">
                        <Profile />
                    </div>
                    <div className="col-lg-4 col-md-3">
                        <RightBar />
                    </div>
                </div>
            </div>
        </>
    )
}






