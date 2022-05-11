import React,{ useEffect, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import prof1 from '../../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../../constant'

const getData = config.url.API_URL+'services/friendslists/'
const deleteDataUrl = config.url.API_URL+'services/requests/'

function FriendsList() {
    const [members, setMembers] = useState([])
    const [members2, setMembers2] = useState([])
    const token = localStorage.getItem('token')

    const getFriendsList = async () => {
        const response = await axios.get(getData + token)
        console.log('response=>',response.data.responseData1)
        const list = {
            ...response.data.responseData1.acceptorId,
            ...response.data.responseData2.referenceUserId
        }

        console.log('list =>',response)
        setMembers(await response.data.responseData1)
        setMembers2(await response.data.responseData2)
    }

    useEffect(() => {
        getFriendsList()
    },[])

    if(!localStorage.getItem('token')) {
        return <Navigate to="/auth/login" />
    }

    const handleClick = async e =>{
        const response = await axios.delete(deleteDataUrl + e.target.id)
        if(response) getFriendsList()
    }
    
  return (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <LeftNavbar />
                </div>

                <div className="col-lg-5 col-md-6 shadow-sm members-sec">
                    <h4 className='my-4'>Friends</h4>
                    {members && members.map((items, index)=>{
                        console.log('items=>', items)
                        return(
                            <div className="members" key={index}>
                                <div className="profile_part">
                                    <div className="pro_img">
                                        {items.referenceUserId.profilePhoto ?
                                            (<img src={items.referenceUserId.profilePhoto} alt="members profile" />)
                                            : (<img src={prof1} alt="members profile" />)
                                        }
                                    </div>
                                    <div className="pro_details">
                                        <div className="pro_name">{items.referenceUserId.firstName+' '+items.referenceUserId.lastName}</div>
                                    </div>
                                </div>
                                <div className="btn-divs">
                                    <button className="left_part btn btn-primary unfriend-btn" id={items._id} onClick={handleClick}>unfriend</button>
                                    <Link className="left_part btn btn-success add-btn" to={'/profiles/' + items.referenceUserId.id}>See Profile</Link>
                                </div>
                            </div>
                        )
                    })}
                    {members2 && members2.map((items, index)=>{
                        return(
                            <div className="members" key={index}>
                                <div className="profile_part">
                                    <div className="pro_img">
                                        {items.acceptorId.profilePhoto ?
                                            (<img src={items.acceptorId.profilePhoto} alt="members profile" />)
                                            : (<img src={prof1} alt="members profile" />)
                                        }
                                    </div>
                                    <div className="pro_details">
                                        <div className="pro_name">{items.acceptorId.firstName+' '+items.acceptorId.lastName}</div>
                                    </div>
                                </div>
                                <div className="btn-divs">
                                    <button className="left_part btn btn-primary unfriend-btn" id={items._id} onClick={handleClick}>unfriend</button>
                                    <Link className="left_part btn btn-success add-btn" to={'/profiles/' + items.acceptorId.id}>See Profile</Link>
                                </div>
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