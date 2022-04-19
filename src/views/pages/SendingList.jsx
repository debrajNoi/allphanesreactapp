import React,{ useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import prof1 from '../../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../../constant'

const getData = config.url.API_URL+'services/requests'

function SendingList() {
    const [members, setMembers] = useState([])
    const token = localStorage.getItem('token')

    const getSendingList = async () => {
        const response = await axios.get(getData+'/'+token)
        console.log(response)
        setMembers(await response.data.view)
    }

    useEffect(() => {
        getSendingList()
    },[])

    if(!localStorage.getItem('token')) {
        return <Navigate to="/auth/login" />
    }

    const handleClick = async e =>{
        const response = await axios.delete(getData+ '/' + e.target.id)
        if(response) getSendingList()
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-3">
                        <LeftNavbar />
                    </div>
                    <div className="col-lg-6 col-md-6 shadow-sm">
                        <h4 className='my-4'>Sended</h4>
                        {members && members.map((items, index)=>{
                            return(
                                <div className="members" key={index}>
                                    <div className="profile_part">
                                        <div className="pro_img">
                                            <img src={prof1} alt="members profile" />
                                        </div>
                                        <div className="pro_details">
                                            <div className="pro_name">{items.user_info.firstName + ' ' + items.user_info.lastName}</div>
                                        </div>
                                        {/* <div>{items._id}</div> */}
                                    </div>
                                    <button className="left_part btn btn-primary" id={items._id} onClick={handleClick}>cancel</button>
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

export default SendingList