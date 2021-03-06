import React,{ useEffect, useState } from "react"
import { Link } from "react-router-dom"
import profilePhoto1 from '../../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../../constant.js'

const onlineURL = config.url.API_URL+'users/online'

function LeftNavbar(props) {	
   const [onlineUsers, setOnlineUsers] = useState([])
   const token = localStorage.getItem('token')

   const getOnlineUsers = async () =>{
      const response = await axios.get(onlineURL)
      console.log(response)
      setOnlineUsers(await response.data.responseData)
   }  
   
   useEffect(() => {
      getOnlineUsers()
  },[])

	return (
		<section id="leftBar">
         <div className="left-sec-1">
            <div className="left-sec-con"><Link to="/profile">Events</Link></div>
            <div className="left-sec-con"><Link to={"/user-profile/" + token}>My Space</Link></div>                                
            <div className="left-sec-con"><Link to="/members">Members</Link></div>
            <div className="left-sec-con"><Link to="/request-list">Friend Requests</Link></div>                                
            <div className="left-sec-con"><Link to="/sent-list">Sent Requests</Link></div>                                
            <div className="left-sec-con"><Link to="/friends-list">Friends List</Link></div>
            <div className="left-sec-con"><Link to="/gellary-list">Gallery List</Link></div>                                
         </div>
         <div className="online-component">
            <div className="online-title">
               <div className="online-dot"></div> Online
            </div>
            {/* loop  */}
            
               {onlineUsers && onlineUsers.map((user, index) => {
                  return (
                     <Link to="/profile" className="online-users" key={index}>
                        <div className="online-Profile">
                           <img src={user.profilePhoto ? user.profilePhoto : profilePhoto1} alt="profile not found" />
                        </div> 
                        <div className="online-name">{user.firstName+ ' ' + user.lastName}</div>
                     </Link>
                  )
               })}

            {/* end loop  */}
            
         </div>
      </section>
	)
}			
			 
export default LeftNavbar