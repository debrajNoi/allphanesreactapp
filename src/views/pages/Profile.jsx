import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

import axios from "axios"
import { config } from '../../constant'
import Modalx from '../../components/Modals/Modal'
import Modaly from '../../components/Modals/Modaly'
import Modalz from '../../components/Modals/Modalz'
import prof1 from '../../assets/web_img/choto_logo_1.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faComment, faEdit} from "@fortawesome/free-solid-svg-icons"
import {faCamera} from "@fortawesome/free-solid-svg-icons"
import {faImage} from "@fortawesome/free-solid-svg-icons"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const createPost = config.url.API_URL+'posts/create'
const likePost = config.url.API_URL+'social/like'
const getPosts = config.url.API_URL+'posts/'
const getUserUrl = config.url.API_URL+'users/'
const getLikeUrl = config.url.API_URL+'social/likeview'

function Profile() {
    const [postdesc, setPostDesc] = useState()
    const [posts, setPosts] = useState([])
    const [singleUser, setSingleUser] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalShow1, setModalShow1] = useState(false)
    const [modalShow2, setModalShow2] = useState(false)
    const [likeToggle, setLikeToggle] = useState(false)
    const [like, setLike] = useState([])

    const token = localStorage.getItem("token")
    
    const getAllPosts = async () => {
        const response = await axios.get(getPosts)
        console.log("res=>",response)
        setPosts(await response.data.view)
    }

    const getSingleUser = async e => {
        const url = getUserUrl + token
        const response = await axios.get(url)
        setSingleUser(await response.data.responseData)
    }

    const getLikes = async e =>{
        const response = await axios.get(getLikeUrl)
        setLike(response.data.view)
        console.log("like",response)
    }

    const handleLikeClick = async (postId, userId) =>{
        console.log("click>>")
        const dataPost = await axios.post(likePost, {
            referenceUserId:userId,
            referencePostId:postId,
        })
        if(dataPost){
            // setLike(dataPost)
            // setLikeToggle(true)
            console.log(dataPost)
        }
    }

    const handleChange = e => {
        setPostDesc(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        const id = localStorage.getItem('token')
        let data = {
            'referenceUserId' : id,
            'postTitle' : 'testing',
            'postDescription' : postdesc
        }
        axios.post(createPost,data)
		.then((response) => {
            setPostDesc('')
            getAllPosts(getPosts)
            
		})
		.catch(err => {
		    console.log('error=>',err)
		})
    }

useEffect(() => {
        getAllPosts(getPosts)
        getSingleUser()
        getLikes()
    },[])
  
    return (
    <section id="profile">

        <div className="middle-sec-box cover-photo my-3 p-1 cover-sec" style={{backgroundImage: `url(${singleUser.coverPhoto})`}}>
            <button type='button' className='btn btn-secondary mb-3 ml-5 mx-1 cover-btn' onClick={() => setModalShow2(true)}>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </button>
            <div className="profile-photo2 profile-sec2 profile-photo">
            <button type='button' className='btn btn-secondary mb-3 ml-5 mx-1 profile-btn' onClick={() => setModalShow1(true)}>
                        <FontAwesomeIcon icon={faCamera} className="shadow"></FontAwesomeIcon>
                    </button>
                {singleUser.profilePhoto ? (<img src={singleUser.profilePhoto} alt="profile" />) 
                : (<img src={prof1} alt="profile" />) }                                    
            </div>
            <div className="cover-content"></div>
        </div>

        {/* <div className="trend-tags mt-3">
            <div className="trend-tag bg-1">#post</div>
            <div className="trend-tag bg-2">#fans</div>
            <div className="trend-tag bg-3">#following</div>
        </div> */}

        {/* create post section  */}
        <div className="middle-sec-box post-area my-3 p-4 profile-sec2">
        
            <div className="profile-photo2 profile-sec2 com-sec">
            {singleUser.profilePhoto ? (<img className='sub-profile-pic' src={singleUser.profilePhoto} alt="profile" />) 
                : (<img src={prof1} className='sub-profile-pic' alt="profile" />) }  
            
            </div>
            
            <div className="post-text">
                {/* <textarea name="postsText" >d</textarea> */}
                <form action="" onSubmit={handleSubmit}>
                    <textarea onChange={handleChange} value={postdesc}  className='comment-area' required></textarea>
                    <button type='submit' className='btn btn-primary mb-3 mx-1'><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></button>
                    <button type='button' className='btn btn-secondary mb-3 ml-5 mx-1' onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                    </button>
                    {/* profile button was here  */}
                    {/* cover button was here  */}
                </form>
                
        
                <Modalx
                    show={modalShow}
                    onHide={() => setModalShow(false)} 
                    backdrop="static" 
                    refId ={token}
                    postFunc = {getAllPosts}
                    posts = {setPosts}
                />

                <Modaly
                    show={modalShow1}
                    onHide={() => setModalShow1(false)} 
                    backdrop="static" 
                    posts = {setSingleUser}
                />

                <Modalz
                    show={modalShow2}
                    onHide={() => setModalShow2(false)} 
                    backdrop="static" 
                    posts = {setSingleUser}
                /> 
            </div>
        </div>
       
        {/* view post section */}
        <div className="post-area-section mb-5">
            {/* //loop this  */}
            {posts && posts.map((item, index) => {
                    return (
                        <div className="view-post pb-3 mt-3" key={index}>
                            <div className="post-creator">
                                <Link to={"/user-profile/"+ item.user_info[0]._id} className="posted-user">
                                    <div className='posted-user-d'>
                                    <div className="pro_img">
                                        {item.user_info[0].profilePhoto ? (<img src={item.user_info[0].profilePhoto} alt="members profile" />) 
                                        : (<img src={prof1} alt="members profile" />)}
                                        
                                    </div>
                                        {/* <img src={item.user_info[0].profilePhoto && item.user_info[0].profilePhoto} alt="profile" className='posted-profile' /> */}
                                        <div className="post-user-name">{item.user_info[0] && item.user_info[0].firstName+ ' ' + item.user_info[0].lastName}</div>
                                    </div>                                   
                                </Link>
                            </div>

                            {item.postImage && <img src={item.postImage} alt="posts" />}
                            <div className="view-post-des mt-2">
                                {item.postDescription && item.postDescription}
                            </div>
                            
                            <div className='mt-3 post-action-sec d-flex gap-2'>
                                {likeToggle === true ? (
                                    <div className="like" onClick={() => handleLikeClick(item._id, item.user_info[0]._id)}>
                                        <FontAwesomeIcon icon={faHeart} style={{color : "red"}}></FontAwesomeIcon> 
                                    </div>)
                                    :(<div className="like" onClick={() => handleLikeClick(item._id, item.user_info[0]._id)}>
                                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> 
                                    </div>)
                                }  
                                
                                <div className="commentx" onClick={handleLikeClick}>
                                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                                </div>

                                <div className="commentx" onClick={handleLikeClick}>
                                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                                </div>
                            </div>

                            {/* {item.postImage && <img src={item.postImage} alt="posts" />}
                            <div className="view-post-des mt-2">
                                <span className='view_name'>{item.postDescription && item.user_info[0].firstName+ ' ' + item.user_info[0].lastName + ' : '} </span>{item.postDescription && item.postDescription}
                            </div> */}

                            <div className="mt-3 add_comment d-flex">
                                <input type="text" name="comment" className="comment" placeholder='Add comment' />
                                <div className="commentPost">
                                    Post 
                                </div>
                            </div>

                        </div>
                    )
                // }
                // return
            })} 
            {/* end loop  */}
            
        </div>
    </section>
  )
}

export default Profile