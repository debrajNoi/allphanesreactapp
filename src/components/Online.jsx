import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"

import profilePhoto1 from '../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../constant.js'

const onlineURL = config.url.API_URL+'users/online'
const onlineURL1 = config.url.API_URL+'services/friendslistsy/'
const onlineURL2 = config.url.API_URL+'services/friendslistsx/'

function Online() {
    const [onlineUsers, setOnlineUsers] = useState([])
    const [onlineUsers1, setOnlineUsers1] = useState([])
    const [onlineUsers2, setOnlineUsers2] = useState([])
    const token = localStorage.getItem('token')

    const getOnlineUsers = async () =>{
        const response = await axios.get(onlineURL)
        console.log(response)
        setOnlineUsers(await response.data.responseData)
    } 

    const getOnlineUsers1 = async () =>{
        const response = await axios.get(onlineURL1 + token)
        console.log("o1>>",response.data.responseData)
        setOnlineUsers1(await response.data.responseData)
    } 

    const getOnlineUsers2 = async () =>{
        const response = await axios.get(onlineURL2 + token)
        console.log("o2>>",response.data.responseData)
        setOnlineUsers2(await response.data.responseData)
    } 

    useEffect(() => {
        getOnlineUsers()
        getOnlineUsers1()
        getOnlineUsers2()
        // getFriendsList()  
    },[])

    return (
        <div>
            {onlineUsers1 && onlineUsers1.map((user, index) => {
                return (
                    <Link to={user.user_info._id ? ("/profiles/" + user.user_info._id) : ''} className="online-users" key={index}>
                    <div className="online-Profile">
                        <img src={user.user_info.profilePhoto ? user.user_info.profilePhoto : profilePhoto1} alt="profile not found" />
                    </div> 
                    <div className="online-name">{user.user_info.firstName+ ' ' + user.user_info.lastName}</div>
                    </Link>
                )
            })}

            {onlineUsers2 && onlineUsers2.map((user, index) => {
                return (
                    <Link to={user.user_info._id ? ("/profiles/" + user.user_info._id) : ''} className="online-users" key={index}>
                    <div className="online-Profile">
                        <img src={user.user_info.profilePhoto ? user.user_info.profilePhoto : profilePhoto1} alt="profile not found" />
                    </div> 
                    <div className="online-name">{user.user_info.firstName+ ' ' + user.user_info.lastName}</div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Online