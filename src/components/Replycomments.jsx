import React, { useState, useEffect } from "react"
import prof1 from '../assets/web_img/choto_logo_1.png'

import axios from "axios"
import { config } from '../constant'

const replyCommentGetUrl = config.url.API_URL + 'social//replycomments/'

function ReplyComments(props) {
    console.log("kfsdjfs>>", props)
    const [allComments, setAllComments] = useState([])

    const getAllReplyComments = async e => {
        const url = replyCommentGetUrl + props.commentid
        const response = await axios.get(url)
        console.log("Replycomments>>", response)
        setAllComments(await response.data.view)
    }

    useEffect(() => {
        if (props.show)
            getAllReplyComments()
    }, [props.show])

    return (
        <div>
            <div style={{ position: "relative" }}>
                <div className="row">
                    
                    <div className="col-lg-12">
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
                                            <div className="fs-14 viewD">
                                                <span className="user_name">{item.referenceUserId.firstName + ' ' + item.referenceUserId.lastName} :</span>  
                                                {item.messageText ? item.messageText : ''}
                                            </div>
                                        </div>
                                        
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

export default ReplyComments