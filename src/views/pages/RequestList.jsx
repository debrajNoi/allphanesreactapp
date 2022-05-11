import React,{ useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import prof1 from '../../assets/web_img/choto-log-img2.jpg'

import axios from "axios"
import { config } from '../../constant'

const getData = config.url.API_URL+'services/acceptrequest/'
const acceptRequest = config.url.API_URL+'services/requestaccept'

function RequestList() {
    const [members, setMembers] = useState([])
    const token = localStorage.getItem('token')

    const getRequestList = async () => {
        const response = await axios.get(getData + token)
        setMembers(await response.data.responseData)
        console.log("req res =>",response)
    }

    useEffect(() => {
        getRequestList()
    },[])

    if(!localStorage.getItem('token')) {
        return <Navigate to="/auth/login" />
    }

    const handleClick = async e =>{
        const data = {
            "id" : e.target.id
        }
        console.log("hulu lulu =>",e.target.id)
        const response = await axios.post(acceptRequest, data)
        if(response) getRequestList()
    }
    
  return (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <LeftNavbar />
                </div>
                <div className="col-lg-5 col-md-6 shadow-sm members-sec">
                    <h4 className='my-4'>Request</h4>
                    {members && members.map((items, index)=>{
                        console.log('items=>', items)
                        return(
                            <div className="members" key={index}>
                                <div className="profile_part">
                                    <div className="pro_img">
                                        {items.referenceUserId.profilePhoto ? (<img src={items.referenceUserId.profilePhoto} alt="members profile" />) 
                                        : (<img src={prof1} alt="members profile" />)}
                                        
                                    </div>
                                    <div className="pro_details">
                                        <div className="pro_name">{items.referenceUserId.firstName+' '+items.referenceUserId.lastName}</div>
                                    </div>
                                    {/* <div>{items._id}</div> */}
                                </div>
                                <button className="left_part btn btn-primary add-btn" id={items._id} onClick={handleClick}>Accept</button>
                            </div>
                        )
                    })}
                </div>
                <div className="col-lg-4 col-md-3">
                    <RightBar />
                </div>
            </div>
        </div>

    </div>
  )
}

export default RequestList