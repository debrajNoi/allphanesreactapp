import React, { useState, useEffect } from "react"
import prof1 from '../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../constant'
import ReplyComments from "./Replycomments"

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
    const [commentSwitch, setCommentSwitch] = useState({})
    const [replyShow, setReplyShow] = useState(false)
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

    const handleReplyCommentClick = (commentId, firstName, lastName, index) =>{
        setReplyComment(commentId)
        setComment('@'+firstName + lastName)
        setReplyShow(false)
    }

    const handleReplyCommentView = (index) =>{
        const k = 'comment' + index
        setCommentSwitch(values => ({ ...values, [k]: index }))
        setReplyShow(true)
        console.log(commentSwitch, index)
    }

    const handleChange = e => {
        if(!comment.match('@'))
            setReplyComment('')
        setComment(e.target.value)
    }

    const handleCommentClick = async () => {
        // const regex = '@'
        // console.log("dd>>",replyComment.match(regex))
        if(replyComment){
            const dataArr = {
                referenceUserId: token,
                referencePostId: props.postdetails.postid,
                referenceCommentId : replyComment,
                messageText: comment
            }
            console.log(dataArr)
            const dataPost = await axios.post(replyCommentPost, dataArr)
            if (dataPost) {
                setComment('')
                getAllComments()
                console.log("afte>>", comment)
            }
        } else {
            const dataArr = {
                referenceUserId: token,
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


    useEffect(() => {
        if (props.show)
            getAllComments()
    }, [props.show])

    return (
        <div>
            <div style={{ position: "relative" }}>
                <div className="row">
                    

                    <div className="col-lg-12">
                        {props.show ? (
                            <div className="mt-3 add_comment d-flex px_15 bb-1">
                                <div className="pro_img">
                                    {props.tokenuser ? (<img src={props.tokenuser} alt="members profile" />)
                                        : (<img src={prof1} alt="members profile" />)}
                                </div>
                                <input type="text" name="replyComment" onChange={handleChange} className="comment comment1" placeholder='Add comment' value={comment} />
                                <div className="commentPost" onClick={handleCommentClick}>
                                    Post
                                </div>
                            </div>
                        ) : ''}

                        {allComments && allComments.map((item, index) => {
                            return (
                                <div className="commentsDiv" key={index}>
                                    <div className="pro_img_com">
                                        {item.referenceUserId ? (
                                            <div className="d-flex ">
                                                {item.referenceUserId.profilePhoto ? (<img src={item.referenceUserId.profilePhoto} alt="members profile" />) : (<img src={prof1} alt="profile" />)}
                                                
                                            </div>
                                        ) : ''}
                                    </div>

                                    <div className="commentsView">
                                        <div className="commentBox">
                                            <pre className="fs-14 viewD">
                                                <span className="user_name">{item.referenceUserId.firstName + ' ' + item.referenceUserId.lastName} :</span>  
                                                {item.messageText ? item.messageText : ''}
                                            </pre>
                                            <div className="d-flex gap-2">
                                                <div className="like commentx h-underline" onClick={() => handleLikeClick(item._id)}>
                                                    {item.replyLikeCount ? item.replyLikeCount : 0} Likes
                                                </div>
                                                <div className="h-underline" onClick={() => handleReplyCommentClick(item._id, item.referenceUserId.firstName, item.referenceUserId.lastName, index)}>reply</div>
                                       
                                            </div>
                                        </div>
                                        {commentSwitch['comment' + index] === index ? (
                                            <ReplyComments show={replyShow} commentid={item._id}/>
                                        ) : ''}
                                        <div className="h-underline replyComment" onClick={()=>handleReplyCommentView(index)}>view {item.replyCommentCount ? item.replyCommentCount : 0} reply</div>
                                    </div>
                                    
                                </div>
                            )
                        })}

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments