import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

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
import ReadMore from '../../components/Readmore'
import RightBar from '../../components/Navbars/RightBar'
import LeftNavbar from '../../components/Navbars/LeftNavbar'

const createPost = config.url.API_URL+'posts/create'
const likePost = config.url.API_URL+'social/like'
const getPosts = config.url.API_URL+'posts/myspace/'
const getUserUrl = config.url.API_URL+'users/'
const commentPost = config.url.API_URL+'social/comments'


function UserProfile(props) {
    const params = useParams();
    console.log(params)
    const [postdesc, setPostDesc] = useState('')
    const [posts, setPosts] = useState([])
    const [singleUser, setSingleUser] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalShow1, setModalShow1] = useState(false)
    const [modalShow2, setModalShow2] = useState(false)
    const [comment, setComment] = useState({})
    const token = localStorage.getItem('token')

    const getAllPosts = async () => {
        const response = await axios.get(getPosts + params.id)
        console.log("res=>",response)
        setPosts(await response.data.view)
    }

    const getSingleUser = async e => {
        const url = getUserUrl + token
        const response = await axios.get(url)
        setSingleUser(await response.data.responseData)
    }

    const handleLikeClick = async (postId, userId) =>{
        console.log("click>>")
        const dataPost = await axios.post(likePost, {
            referenceUserId:token,
            referencePostId:postId,
        })
        if(dataPost){
            getAllPosts()
            console.log(dataPost)
        }
    }

    const handleCommentChange = e =>{
        setComment(values => ({...values,[e.target.name]: e.target.value }))
        console.log(comment)
    }

    const handleCommentClick = async (postId, userId, commentName) =>{
        console.log("click comment>>",commentName,comment[commentName])
        const dataArr = {
            referenceUserId:userId,
            referencePostId:postId,
            messageText : comment[commentName]
        }
        console.log(dataArr)
        const dataPost = await axios.post(commentPost, dataArr)
        if(dataPost){
            getAllPosts()
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

    },[])

    
  
    return (
        <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-3 col-md-3">
                       <LeftNavbar /> 
                    </div>
                    {/* Middle section  */}
                    <div className="col-lg-5 col-md-6 bg_allp">
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

                        {/* create post section  */}
                    <div className="middle-sec-box post-area my-3 p-4 profile-sec2">
                    
                    <div className="profile-photo2 profile-sec2 com-sec">
                        {singleUser.profilePhoto ? (<img className='sub-profile-pic' src={singleUser.profilePhoto} alt="profile" />) 
                        : (<img src={prof1} className='sub-profile-pic' alt="profile" />) }  
                    </div>
                    
                    <div className="post-text po_text">
                        <form onSubmit={handleSubmit} className="post_form">
                            <textarea placeholder='Share your ideas' onChange={handleChange} value={postdesc}  className='comment-area' required></textarea>
                            <div className="post_action">
                                <button type='button' className='btn' onClick={() => setModalShow(true)}>
                                    Photo <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                                </button>
                                <button type='submit' className='btn'>
                                    Post
                                </button>
                            </div>
                        </form>

                        <Modalx
                            show={modalShow}
                            onHide={() => setModalShow(false)} 
                            backdrop="static" 
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
                            <div className="post-creator px_15">
                                <div className="posted-user">
                                    <div className='posted-user-d'>
                                    <div className="pro_img">
                                        {item.user_info[0].profilePhoto ? (<img src={item.user_info[0].profilePhoto} alt="members profile" />) 
                                        : (<img src={prof1} alt="members profile" />)}
                                        
                                    </div>
                                        {/* <img src={item.user_info[0].profilePhoto && item.user_info[0].profilePhoto} alt="profile" className='posted-profile' /> */}
                                        <div className="post-user-name">{item.user_info[0] && item.user_info[0].firstName+ ' ' + item.user_info[0].lastName}</div>
                                    </div>                                   
                                </div>
                            </div>

                            {item.postInfo[0] && <img src={item.postInfo[0].postImagePath} alt="posts" className="post_img_1" />}
                            
                            {!item.postInfo[0] && (
                                <pre className='mt-4 px_15'>
                                    <ReadMore className="view-post-des mt-2">
                                        {item.postDescription && item.postDescription}
                                    </ReadMore>
                                </pre>
                            )}
                            
                            
                            <div className='mt-3 post-action-sec d-flex gap-3'>
                                {item.isLiked[0] ? (
                                    <div className="like commentx" onClick={() => handleLikeClick(item._id)}>
                                        <FontAwesomeIcon icon={faHeart} className="post_icons" style={{color : "red"}}></FontAwesomeIcon> 
                                    </div>)
                                    :(<div className="like commentx" onClick={() => handleLikeClick(item._id)}>
                                        <FontAwesomeIcon icon={faHeart} className="post_icons"></FontAwesomeIcon> 
                                    </div>)
                                }  
                                
                                <div className="commentx">
                                    <FontAwesomeIcon icon={faComment} className="post_icons"></FontAwesomeIcon>
                                </div>

                                <div className="commentx">
                                    <FontAwesomeIcon icon={faPaperPlane} className="post_icons"></FontAwesomeIcon>
                                </div>
                                
                            </div>
                            <div className="px_15">
                                <div className="likes_count">
                                    {item.totalLikes && item.totalLikes} Likes
                                </div>

                                {item.postInfo[0] && item.postDescription && (<ReadMore className="view-post-des mt-2">
                                    <span className='view_name'>{item.postDescription && item.user_info[0].firstName+ ' ' + item.user_info[0].lastName + ' : '} </span><pre>{item.postDescription && item.postDescription}</pre>
                                </ReadMore>)}

                                <div className="comment_count">
                                    View all {item.totalComment && item.totalComment} Comments
                                </div>
                                
                                <div className="usr_commt">
                                    {item.IsCommented ? (<>
                                        {item.IsCommented.map((comments, index1) => {
                                            return(
                                                <div className='mt-1 cmmt_txt' key={index1}>
                                                    
                                                    <span className='cmmt_user'>{item.user_info[0] && singleUser.firstName+ ' ' + singleUser.lastName}: </span> 
                                                    <span className='cmmt_text'>{comments.messageText}</span>
                                                </div>
                                            )
                                        })}
                                    </>
                                        
                                    ): ''}
                                </div>
                            </div>

                            <div className="mt-3 add_comment d-flex px_15">
                                <div className="pro_img">
                                    {singleUser.profilePhoto ? (<img src={singleUser.profilePhoto} alt="members profile" />) 
                                    : (<img src={prof1} alt="members profile" />)}  
                                </div>
                                <input type="text" name={'comment' + index} onChange={handleCommentChange} className="comment" placeholder='Add comment' />
                                <div className="commentPost" onClick={() => handleCommentClick(item._id, token, 'comment'+index)}>
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
                    </div>
                    <div className="col-lg-4 col-md-3 bg_allp">
                        <RightBar />
                    </div>
                </div>
            </div>
    
  )
}

export default UserProfile