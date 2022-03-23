import React from 'react'
import { Navigate } from 'react-router-dom'

import IndexNavbar from '../../components/Navbars/IndexNavbar'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import Profile from './Profile'

export default function ProfileLayout() {
    if(!localStorage.getItem('token')) return <Navigate to="/login" />

    return (
        <>
            {/* <div className='navbar'>Nav bar</div> */}
            <IndexNavbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-2 col-md-3">
                       <LeftNavbar /> 
                    </div>
                    {/* Middle section  */}
                    <div className="col-lg-6 col-md-6">
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






