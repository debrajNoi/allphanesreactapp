import React, {useState} from 'react'
import Youtube from '../../assets/web_img/choto_logo-removebg.jpg'


function RightBar() {
    // const [videos, setVideos] = useState(3)
  return (
    <section id="rightBar" className='py-3'>
        <div className="ads">ADS</div>
        <div className="trend-sec mt-3">
            <div className="trend-title mb-2">Trending Cultures in your Area</div>
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
                    <div className="trend-tags mt-3">
                        <div className="trend-tag">#shreya</div>
                        <div className="trend-tag">#shreya</div>
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
                        <div className="trend-tag">#shreya</div>
                        <div className="trend-tag">#shreya</div>
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
                        <div className="trend-tag">#shreya</div>
                        <div className="trend-tag">#shreya</div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default RightBar