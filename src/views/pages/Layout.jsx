import main_logo from '../../assets/web_img/main_logo.png'
import Youtube from '../../assets/web_img/youtube.png'
// import { withRouter } from 'react-router-dom'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'


export default function Layout(props){
    const location = useLocation()
    const [data, setData] = useState({})

    const childToParent = (childdata) => {
        setData(childdata)
        console.log('email =>',childdata)
    }

    console.log(location.pathname)

    return(
        <div className="Login">
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 order-lg-1 order-md-1 order-2'>
                        <img src={main_logo} className="main_logo m-hide" alt="logo" />
                        <img src={Youtube} className="youtube_frame mt-5" alt="logo" />
                    </div>
                    <div className='col-lg-6 col-md-6 order-lg-2 order-md-2 order-1 hxz-100'>
                        <img src={main_logo} className="main_logo m-show" alt="logo" />
                        {/* {location.pathname === '/registration' && <Registration childToParent={childToParent} />}
                        {location.pathname === '/otp-verification' && <OtpVerification email = {data} />}
                        {location.pathname === '/login' && <Login />} */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )

}


