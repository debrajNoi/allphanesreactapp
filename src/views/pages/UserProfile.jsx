import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import axios from "axios"
import { config } from '../../constant'
import RightBar from '../../components/Navbars/RightBar'
import LeftNavbar from '../../components/Navbars/LeftNavbar'

const createPost = config.url.API_URL+'posts/create'
const getPosts = config.url.API_URL+'posts/'
const getUserUrl = config.url.API_URL+'users/'

function UserProfile(props) {
    const params = useParams();
    const [postdesc, setPostDesc] = useState()
    const [posts, setPosts] = useState([])
    const [singleUser, setSingleUser] = useState([])
    const token = localStorage.getItem("token")
    
    const getAllPosts = async e => {
        const response = await fetch(getPosts + params.id)
        const data = await response.json()
        setPosts(await data.responseData)
        console.log('resultSin => ', data.responseData)
    }

    const getSingleUser = async e => {
        const url = getUserUrl + params.id
        const response = await axios.get(url)
        setSingleUser(await response.data.responseData)  
        console.log('singleuser', response);
    }

    useEffect(() => {
        getAllPosts()
        getSingleUser()
    },[params])

    const handleChange = e => {
        setPostDesc(e.target.value)
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        const id = localStorage.getItem('token')
        let data = {
            'referenceUserId' : id,
            'postTitle' : 'testing',
            'postDescription' : postdesc
        }
        await axios.post(createPost,data)
		.then((response) => {
            setPostDesc('')
            getAllPosts()
		})
		.catch(err => {
		    console.log('error=>',err)
		})
    }
  
    return (
        <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-2 col-md-3">
                       <LeftNavbar /> 
                    </div>
                    {/* Middle section  */}
                    <div className="col-lg-6 col-md-6">
                    <section id="profile">

                        <div className="middle-sec-box cover-photo my-3 p-1 cover-sec" style={{backgroundImage: `url(${singleUser.coverPhoto? singleUser.coverPhoto : ''})`}}>
                            <div className="profile-photo profile-sec profile-photo2">
                                <img src={singleUser.profilePhoto} alt="profile" />                                    
                            </div>
                            <div className="cover-content"></div>
                        </div>

{/* <div className="trend-tags mt-3">
    <div className="trend-tag bg-1">#post</div>
    <div className="trend-tag bg-2">#fans</div>
    <div className="trend-tag bg-3">#following</div>
</div> */}



{/* view post section */}
<div className="post-area-section mb-5 post-section">
    {/* //loop this  */}
    {posts && posts.map((item, index) => {
            return (
                <div className="view-post pb-3 mt-3" key={index}>
                    <div className="post-creator">
                        <Link to="/profile" className="posted-user">
                            <div className='posted-user-d'>
                                {singleUser.profilePhoto ? (
                                    <img src={singleUser.profilePhoto} alt="profile" className='posted-profile' />
                                    // <img src={singleUser.profilePhoto} alt='profile' />
                                ):(<div>gol</div>)}
                                {/* <img src={item.user_info[0].profilePhoto && item.user_info[0].profilePhoto} alt="profile" className='posted-profile' /> */}
                                <div className="post-user-name">{singleUser && singleUser.firstName+ ' ' + singleUser.lastName}</div>
                            </div>                                   
                        </Link>
                    </div>
                    {item.postImage && <img src={item.postImage} alt="posts" />}
                    <div className="view-post-des mt-2">
                        {item.postDescription && item.postDescription}
                    </div>
                </div>
            )
        // }
        // return
    })} 
    {/* end loop  */}
    
</div>
</section>
                    </div>
                    <div className="col-lg-4 col-md-3">
                        <RightBar />
                    </div>
                </div>
            </div>
    
  )
}

export default UserProfile