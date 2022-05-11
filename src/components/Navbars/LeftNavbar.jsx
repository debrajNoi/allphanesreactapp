import React,{ useEffect, useState } from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import { config } from '../../constant.js'
import Online from "../Online"

const onlineURL = config.url.API_URL+'users/online'
// const getData = config.url.API_URL+'services/friendslists/'

function LeftNavbar(props) {	
   const [members, setMembers] = useState([])
   const token = localStorage.getItem('token')

	return (
		<section id="leftBar">
         <div className="left-sec-1">
            {/* <div className="left-sec-con"><Link to="/mycanvas">Events</Link></div> */}
            {/* <div className="left-sec-con"><Link to={"/myspace/" + token}>My Space</Link></div>                                 */}
            <div className="left-sec-con"><Link to="/members">Members</Link></div>
            <div className="left-sec-con"><Link to="/request-list">Friend Requests</Link></div>                                
            <div className="left-sec-con"><Link to="/sent-list">Sent Requests</Link></div>                                
            <div className="left-sec-con"><Link to="/friends-list">Friends List</Link></div>
            <div className="left-sec-con"><Link to="/photo-gellary">Photo Gellary</Link></div>                                
         </div>
         <div className="online-component">
            <div className="online-title">
               <div className="online-dot"></div> Online
            </div>
            {/* loop  */}
            
               <Online />

            {/* end loop  */}
            
         </div>
      </section>
	)
}			
			 
export default LeftNavbar