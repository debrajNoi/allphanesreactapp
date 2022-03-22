import React from 'react'
import { Link } from 'react-router-dom'
import coverPhoto from '../../assets/web_img/cover_photo.webp'
import profilePhoto from '../../assets/web_img/profile.png'
import profilePhoto1 from '../../assets/web_img/profile_1.png'
import goat from '../../assets/web_img/goat.png'
import Youtube from '../../assets/web_img/youtube.png'
import IndexNavbar from '../../components/Navbars/IndexNavbar'

export default function Profile() {
    return (
        <>
            {/* <div className='navbar'>Nav bar</div> */}
            <IndexNavbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-2 col-md-2">
                        <section id="leftBar">
                            <div className="left-sec-1">
                                <div className="left-sec-con"><Link to="/profile">Your free content Events</Link></div>
                                <div className="left-sec-con"><Link to="/profile">Friends</Link></div>
                                <div className="left-sec-con"><Link to="/profile">Get started</Link></div>
                                <div className="left-sec-con"><Link to="/profile">FAQ</Link></div>
                            </div>
                            <div className="online-component">
                                <div className="online-title">
                                   <div className="online-dot"></div> Online/ live
                                </div>
                                <Link to="/profile" className="online-users mt-3">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                <Link to="/profile" className="online-users">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                <Link to="/profile" className="online-users">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                <Link to="/profile" className="online-users">
                                   <div className="online-Profile">
                                        <img src={profilePhoto1} alt="profile not found" />
                                    </div> 
                                   <div className="online-name">Jhon Doe</div>
                                </Link>
                                
                            </div>
                        </section>
                    </div>
                    {/* Middle section  */}
                    <div className="col-lg-6 col-md-6">
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
                                <div className="trend-tag bg-red">#shreya</div>
                                <div className="trend-tag">#shreya</div>
                            </div>
                            {/* create post section  */}
                            <div className="middle-sec-box post-area my-3 p-4">
                                <div className="profile-photo">
                                    <img src={profilePhoto} alt="profile" />
                                    
                                </div>
                                <div className="post-text">
                                    <textarea name="postsText" className='comment-area'>d</textarea>
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
                                        <img src={profilePhoto1} alt="image not found" />
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
                                        <img src={goat} alt="image not found" />
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
                                        <img src={profilePhoto1} alt="image not found" />
                                    </div>
                                    <div className="view-post-des mt-3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sapiente temporibus quae facilis deleniti vitae vero excepturi magni nobis illum. Nulla velit tempore nisi commodi hic labore eius in laborum!
                                    </div>
                                </div>
                                {/* dummy  */}
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <section id="rightBar" className='py-3'>
                            <div className="ads">ADS</div>
                            <div className="trend-sec mt-3">
                                <div className="trend-title mb-2">Trending Cultures in your Area</div>
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
                    </div>
                </div>
            </div>
        </>
    )
}
