import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import axios from "axios"
import { config } from '../../constant'
import RightBar from '../../components/Navbars/RightBar'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import prof1 from '../../assets/web_img/choto_logo_1.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faComment, faEdit} from "@fortawesome/free-solid-svg-icons"
import {faCamera} from "@fortawesome/free-solid-svg-icons"
import {faImage} from "@fortawesome/free-solid-svg-icons"
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ReadMore from '../../components/Readmore'

// const createPost = config.url.API_URL+'posts/create'
const getPosts = config.url.API_URL+'posts/userspace/'
const getUserUrl = config.url.API_URL+'users/'
const likePost = config.url.API_URL+'social/like'
const commentPost = config.url.API_URL+'social/comments'

function UsersProfile(props) {
    const params = useParams();
    const [posts, setPosts] = useState([])
    const [singleUser, setSingleUser] = useState([])
    const [comment, setComment] = useState({})
    const token = localStorage.getItem("token")

    

    const getAllPosts = async () => {
        const response = await axios.get(getPosts + token + '/' +params.id)
        console.log("res=>",response)
        setPosts(await response.data.view)
    }

    const getSingleUser = async e => {
        const url = getUserUrl + params.id
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

    useEffect(() => {
        getAllPosts()
        getSingleUser()
    },[])

    // if(params.id === token){
    //     console.log("kk");
    //     return <Navigate to={"/user-profile/" + token} />
    // }

    
  
    return (
        <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-3 col-md-3">
                       <LeftNavbar /> 
                    </div>
                    {/* Middle section  */}
                    <div className="col-lg-5 col-md-6 bg_allp">
                    <section id="profile">

                        <div className="middle-sec-box cover-photo my-3 p-1 cover-sec" style={{backgroundImage: `url(${singleUser.coverPhoto? singleUser.coverPhoto : ''})`}}>
                            <div className="profile-photo profile-sec profile-photo2">
                                {singleUser.profilePhoto ?
                                (<img src={singleUser.profilePhoto} alt="profile" />)
                            : (<img src={prof1} alt="profile" />)}  

                            </div>
                            <div className="cover-content"></div>
                        </div>

{/* view post section */}
<div className="post-area-section mb-5">
            {/* //loop this  */}
            {posts && posts.map((item, index) => {
                    return (
                        <div className="view-post pb-3 mt-3" key={index}>
                            <div className="post-creator px_15">
                                <div to={"/user-profile/"+ item.user_info[0]._id} className="posted-user">
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

export default UsersProfile