import main_logo from '../../assets/web_img/main_logo.png'
import Youtube from '../../assets/web_img/youtube.png'
// import { withRouter } from 'react-router-dom'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'


export default function Layout(){
    const location = useLocation()
    return(
        <div className="Login">
            <div className='container'>
                <div className='row align-items-center justify-content-center hxz-100'>
                    <div className='col-lg-6 order-lg-1 order-3 items-center'>
                        <img src={main_logo} className="main_logo m-hide" alt="logo" />
                        <div className='youtube-div'>
                         <img src={Youtube} className="youtube_frame mt-5" alt="logo" />
                        </div>
                    </div>
                    <div className="col-1 order-2"></div>
                    <div className='col-lg-5 order-lg-3 order-md-3 order-1'>
                        <img src={main_logo} className="main_logo m-show" alt="logo" />
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )

}


