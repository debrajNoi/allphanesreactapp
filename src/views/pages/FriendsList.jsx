import React,{ useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import prof1 from '../../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../../constant'

const getData = config.url.API_URL+'services/friendslista'
const getData2 = config.url.API_URL+'services/friendslist'
const acceptRequest = config.url.API_URL+'services/requestaccept'

function FriendsList() {
    const [members, setMembers] = useState([])
    const [members2, setMembers2] = useState([])
    const token = localStorage.getItem('token')

    const getFriendsList = async () => {
        const response = await axios.get(getData+'/'+token)
        setMembers(await response.data.view)
        const response2 = await axios.get(getData2+'/'+token)
        setMembers2(await response2.data.view)
        console.log("req res2 =>",response2)
    }

    useEffect(() => {
        getFriendsList()
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
        if(response) getFriendsList()
    }
    
  return (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <LeftNavbar />
                </div>
                <div className="col-lg-6 col-md-6 shadow-sm">
                    <h4 className='my-4'>Requsts</h4>
                    {members && members.map((items, index)=>{
                        console.log('items=>', items)
                        return(
                            <div className="members" key={index}>
                                <div className="profile_part">
                                    <div className="pro_img">
                                        <img src={prof1} alt="members profile" />
                                    </div>
                                    <div className="pro_details">
                                        <div className="pro_name">{items.user_info.firstName+' '+items.user_info.lastName}</div>
                                    </div>
                                    {/* <div>{items._id}</div> */}
                                </div>
                                <button className="left_part btn btn-primary" id={items._id} onClick={handleClick}>Accept</button>
                            </div>
                        )
                    })}
                    {members2 && members2.map((items, index)=>{
                        console.log('items=>', items)
                        return(
                            <div className="members" key={index}>
                                <div className="profile_part">
                                    <div className="pro_img">
                                        <img src={prof1} alt="members profile" />
                                    </div>
                                    <div className="pro_details">
                                        <div className="pro_name">{items.user_info.firstName+' '+items.user_info.lastName}</div>
                                    </div>
                                    {/* <div>{items._id}</div> */}
                                </div>
                                <button className="left_part btn btn-primary" id={items._id} onClick={handleClick}>Accept</button>
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

export default FriendsList