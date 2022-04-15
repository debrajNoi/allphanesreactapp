import React,{ useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import prof1 from '../../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../../constant'

const getData = config.url.API_URL+'services/friendrequests'
const addFriend = config.url.API_URL+'services/addfriend'

function RequestList() {
    const [members, setMembers] = useState([])
    const token = localStorage.getItem('token')

    const getAllMembers = async url => {
        const id = {
           "id" : localStorage.getItem('token')
        }
        console.log("id =>" ,id)
        await axios.post(url, id).then((response) =>{
            setMembers( response.data.data)
        })
    }

    useEffect(() => {
        getAllMembers(getData)
    },[])

    if(!localStorage.getItem('token')) {
        return <Navigate to="/auth/login" />
    }

    const handleClick = async e =>{
        const data = {
            "referenceUserId" : token,
            "acceptorId" : e.target.id
        }
        
        console.log("hulu lulu =>",data)
        await axios.post(addFriend, data).then((response)=>{
            console.log(response)
        })
    }
    
  return (
    <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <LeftNavbar />
                </div>
                <div className="col-lg-6 col-md-6 shadow-sm">
                    <h4 className='my-4'>Members</h4>
                    {members&& members.map((items, index)=>{
                        console.log('items=>', items)
                        return(
                            <div className="members" key={index}>
                                <div className="profile_part">
                                    <div className="pro_img">
                                        <img src={prof1} alt="members profile" />
                                    </div>
                                    <div className="pro_details">
                                        <div className="pro_name">{items.firstName+' '+items.lastName}</div>
                                    </div>
                                </div>
                                <button className="left_part btn btn-primary" id={items.id} onClick={handleClick}>Add Friend</button>
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