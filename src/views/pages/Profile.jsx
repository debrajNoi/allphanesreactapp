import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import coverPhoto from '../../assets/web_img/cover_photo.webp'
import profilePhoto from '../../assets/web_img/profile.png'
import profilePhoto1 from '../../assets/web_img/profile_1.png'
import goat from '../../assets/web_img/goat.png'

function Profile() {
    const [postdesc, setPostDesc] = useState()

    const handleChange = e => {
        setPostDesc(e.target.value)
        console.log(postdesc)
    }
  
    return (
    <section id="profile">
        {/* cover photo section  */}
        <div className="middle-sec-box cover-photo my-3 p-4" style={{backgroundImage: `url(${coverPhoto})`}}>
            <div className="profile-photo">
                <img src={profilePhoto} alt="profile" />                                    
            </div>
            <div className="cover-content">
                {/* <h2>Hala madrid </h2> */}
            </div>
        </div>
        {/* tags section  */}
        <div className="trend-tags mt-3">
            <div className="trend-tag bg-1">#post</div>
            <div className="trend-tag bg-2">#fans</div>
            <div className="trend-tag bg-3">#following</div>
        </div>
        {/* create post section  */}
        <div className="middle-sec-box post-area my-3 p-4">
            <div className="profile-photo com-sec">
                <img src={profilePhoto} alt="profile" />
                
            </div>
            <div className="post-text">
                {/* <textarea name="postsText" >d</textarea> */}
                <textarea value={postdesc} onChange={handleChange} className='comment-area' />
            </div>
        </div>
        {/* view post section */}
        <div className="post-area-section mb-5">
            {/* //loop this  */}
            <div className="view-post pb-3 mt-3">
                <div className="post-creator">
                    <Link to="/profile" className="posted-user">
                        <div className='posted-user-d'>
                            <img src={profilePhoto1} alt="profile" className='posted-profile' />
                            <div className="post-user-name">Emily Burns</div>
                        </div>                                   
                    </Link>
                </div>
                <div className="view-post-img mt-3">
                    <img src={profilePhoto1} alt="profile not found" />
                </div>
                <div className="view-post-des mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sapiente temporibus quae facilis deleniti vitae vero excepturi magni nobis illum. Nulla velit tempore nisi commodi hic labore eius in laborum!
                </div>
            </div>
            {/* end loop  */}
            <div className="view-post pb-3 mt-3">
                <div className="post-creator">
                    <Link to="/profile" className="posted-user">
                        <div className='posted-user-d'>
                            <img src={goat} alt="profile" className='posted-profile' />
                            <div className="post-user-name">CR7</div>
                        </div>                                   
                    </Link>
                </div>
                <div className="view-post-img mt-3">
                    <img src={goat} alt="profile not found" />
                </div>
                <div className="view-post-des mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sapiente temporibus quae facilis deleniti vitae vero excepturi magni nobis illum. Nulla velit tempore nisi commodi hic labore eius in laborum!
                </div>
            </div>

            <div className="view-post pb-3 mt-3">
                <div className="post-creator">
                    <Link to="/profile" className="posted-user">
                        <div className='posted-user-d'>
                            <img src={profilePhoto1} alt="profile" className='posted-profile' />
                            <div className="post-user-name">Emily Burns</div>
                        </div>                                   
                    </Link>
                </div>
                <div className="view-post-img mt-3">
                    <img src={profilePhoto1} alt="profile not found" />
                </div>
                <div className="view-post-des mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sapiente temporibus quae facilis deleniti vitae vero excepturi magni nobis illum. Nulla velit tempore nisi commodi hic labore eius in laborum!
                </div>
            </div>
            {/* dummy  */}
        </div>
    </section>
  )
}

export default Profile