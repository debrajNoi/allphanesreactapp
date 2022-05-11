import React, { useState, useEffect } from "react"
import { Link, Navigate } from 'react-router-dom'

import { Modal, Button } from 'react-bootstrap'
import images from '../../assets/web_img/bg2.jpg'
import prof1 from '../../assets/web_img/choto_logo_1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faEdit } from "@fortawesome/free-solid-svg-icons"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from '@fortawesome/free-solid-svg-icons'


import axios from "axios"
import { config } from '../../constant'

const getCommentsUrl = config.url.API_URL + 'social/comments/'
const likePost = config.url.API_URL + 'social/replylike'
const commentPost = config.url.API_URL + 'social/comments'
const replyCommentPost = config.url.API_URL + 'social/replycomments'

function Comments(props) {
    const [postInfo, setPostInfo] = useState(props.postinfo)
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [postDescription, setpostDescription] = useState(props.postDescription)
    const [allComments, setAllComments] = useState([])
    const [comment, setComment] = useState('')
    const [replyComment, setReplyComment] = useState('')
    const token = localStorage.getItem("token")

    console.log("commentModalp>>", props)

    const getAllComments = async e => {
        const url = getCommentsUrl + props.postdetails.postid
        console.log(url)
        const response = await axios.get(url)
        console.log("comments>>", response)
        setAllComments(await response.data.view)
    }

    const handleLikeClick = async (commentId) => {
        const dataPost = await axios.post(likePost, {
            referenceUserId: token,
            referencePostId: props.postdetails.postid,
            referenceCommentId: commentId,
        })
        console.log('hola>>', dataPost)
        if (dataPost) {
            getAllComments()
            console.log(dataPost)
        }

    }

    const handleReplyCommentClick = (commentId, firstName, lastName) =>{
        setReplyComment(commentId)
        setComment('@'+firstName + lastName)
    }

    const handleChange = e => {
        setComment(e.target.value)
    }

    const handleCommentClick = async () => {
        if(replyComment){
            const dataArr = {
                referenceUserId: props.userinfo._id,
                referencePostId: props.postdetails.postid,
                referenceCommentId : replyComment,
                messageText: comment
            }
            console.log(dataArr)
            const dataPost = await axios.post(replyCommentPost, dataArr)
            if (dataPost) {
                setComment('')
                console.log("afte>>", comment)
            }
        } else {
            const dataArr = {
                referenceUserId: props.userinfo._id,
                referencePostId: props.postdetails.postid,
                messageText: comment
            }
            console.log(dataArr)
            const dataPost = await axios.post(commentPost, dataArr)
            if (dataPost) {
                setComment('')
                getAllComments()
                console.log("afte>>", comment)
            }
        }
    }

    const closeModal = () => {
        props.onHide()
    }

    useEffect(() => {
        // console.log(props.show)
        if (props.show)
            getAllComments()
    }, [props.show])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="bs_modal"
        >
            <Modal.Body style={{ position: "relative" }}>
                <div className="row">
                    <div className="col-lg-5 post_img">
                        <div className="post-creator px_15">
                            <Link to={"/profiles/" + props.userinfo._id} className="posted-user">
                                <div className='posted-user-d'>
                                    <div className="pro_img">
                                        {props.userinfo.profilePhoto ? (<img src={props.userinfo.profilePhoto} alt="members profile" />)
                                            : (<img src={prof1} alt="members profile" />)}
                                        {/* : (<img src={prof1} alt="members profile" />)} */}

                                    </div>
                                    {/* <img src={item.user_info[0].profilePhoto && item.user_info[0].profilePhoto} alt="profile" className='posted-profile' /> */}
                                    <div className="post-user-name">{props.userinfo && props.userinfo.firstName + ' ' + props.userinfo.lastName}</div>
                                </div>
                            </Link>
                        </div>
                        {props.postinfo && <img src={props.postinfo.postImagePath} alt="modal" style={{ height: "100%" }} />}
                        {props.postdetails.postDescription ?
                            (
                                <pre>
                                    <span className='view_name'>
                                        {props.postdetails.postDescription && props.userinfo.firstName + ' ' + props.userinfo.lastName + ' : '}
                                    </span>
                                    {props.postdetails.postDescription && props.postdetails.postDescription}
                                </pre>) : ''}
                    </div>

                    <div className="col-lg-7">
                        <div onClick={closeModal} className="modal_close_btn">x</div>

                        {allComments && allComments.map((item, index) => {
                            return (
                                <div className="commentsDiv" key={index} style={{background : "red"}}>
                                    <div className="pro_img_com">
                                        {item.referenceUserId ? (
                                            <div className="d-flex mt-3">
                                                {item.referenceUserId.profilePhoto ? (<img src={item.referenceUserId.profilePhoto} alt="members profile" />) : (<img src={prof1} alt="profile" />)}
                                                <div style={{ "marginLeft": "10px", fontWeight: '600' }}>{item.referenceUserId.firstName + ' ' + item.referenceUserId.lastName}</div>
                                            </div>
                                        ) : ''}

                                        {/* // : "(<img src={prof1} alt="members profile" />)"} */}
                                    </div>
                                    {item.messageText ? item.messageText : ''}
                                    <div>
                                        <div className="like commentx" onClick={() => handleLikeClick(item._id)}>
                                            {item.replyLikeCount ? item.replyLikeCount : 0} Likes
                                        </div>
                                    </div>
                                    <div onClick={() => handleReplyCommentClick(item._id, item.referenceUserId.firstName, item.referenceUserId.lastName)}>reply</div>
                                    <div>view {item.replyCommentCount ? item.replyCommentCount : 0} reply</div>
                                </div>
                            )
                        })}

                        <div className="mt-3 add_comment d-flex px_15">
                            <div className="pro_img">
                                {props.userinfo.profilePhoto ? (<img src={props.userinfo.profilePhoto} alt="members profile" />)
                                    : (<img src={prof1} alt="members profile" />)}
                            </div>
                            <input type="text" name="replyComment" onChange={handleChange} className="comment" placeholder='Add comment' value={comment} />
                            <div className="commentPost" onClick={handleCommentClick}>
                                Post
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Comments



