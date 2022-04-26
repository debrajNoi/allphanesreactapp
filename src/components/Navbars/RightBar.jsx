import React, {useState} from 'react'
import Youtube from '../../assets/web_img/choto-log-img.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShare} from "@fortawesome/free-solid-svg-icons"
import {faStar} from "@fortawesome/free-solid-svg-icons";


function RightBar() {
    // const [videos, setVideos] = useState(3)
  return (
    <section id="rightBar" className='py-3'>
        <div className="ads">ADS</div>
        <div className="trend-sec mt-3">
            <div className="trend-title mb-2">Trending Creations in your Area</div>
            {/* {videos && videos.map(item =>{

            })} */}
            {/* first box  */}
            <div className="trend-sec-box">
                <div className="trend-video">
                    
                <img src={Youtube} alt="profile" />

                </div>
                <div className="trend-des w-100">
                    <div className="trend-video-description">
                        description
                    </div>
                    <div className="trend-tags mt-3 trends-tag">
                    <div className="trend-tag"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    </div>
                        <div className="trend-tag">Share <FontAwesomeIcon icon={faShare}></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>

            {/* 2nd box  */}
            <div className="trend-sec-box">
                <div className="trend-video">
                    
                <img src={Youtube} alt="profile" />

                </div>
                <div className="trend-des w-100">
                    <div className="trend-video-description">
                        description
                    </div>
                    <div className="trend-tags mt-3">
                    <div className="trend-tag"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    </div>
                        <div className="trend-tag">Share <FontAwesomeIcon icon={faShare}></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>

            {/* 3rd box  */}
            <div className="trend-sec-box">
                <div className="trend-video">
                    
                    <img src={Youtube} alt="profile" />

                </div>
                <div className="trend-des w-100">
                    <div className="trend-video-description">
                        description
                    </div>
                    <div className="trend-tags mt-3">
                    <div className="trend-tag"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    </div>
                        <div className="trend-tag">Share <FontAwesomeIcon icon={faShare}></FontAwesomeIcon></div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default RightBar