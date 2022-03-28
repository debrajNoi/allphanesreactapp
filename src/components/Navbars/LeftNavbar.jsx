// import React,{ useState } from "react"
import { Link } from "react-router-dom"
import profilePhoto1 from '../../assets/web_img/pro_3.webp'



function LeftNavbar(props) {
  // const logout = () => {
  //  window.localStorage.clear()
  //  window.location.href = process.env.PUBLIC_URL+"/login"
  // }
  
  // const [toggle,setToggle]=useState(0)
  
  return (
    <section id="leftBar">
                            <div className="left-sec-1">
                                <div className="left-sec-con"><Link to="/profile">Your free content Events</Link></div>
                                <div className="left-sec-con"><Link to="/profile">Friends</Link></div>
                                <div className="left-sec-con"><Link to="/profile">Get started</Link></div>
                                <div className="left-sec-con"><Link to="/profile">FAQ</Link></div>
                            </div>
                            <div className="online-component">
                                <div className="online-title">
                                   <div className="online-dot"></div> Online/ live
                                </div>
                                <Link to="/profile" className="online-users mt-3">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                       {/* <img src={`https://raw.githubusercontent.com/Sakibhaqie/allphanes/main/gellary/image/1647426605429.jpg`} alt="not found"/> */}

                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                <Link to="/profile" className="online-users">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                <Link to="/profile" className="online-users">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                <Link to="/profile" className="online-users">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                
                            </div>
                        </section>
  )
}     
       
export default LeftNavbar