import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import coverPhoto from '../../assets/web_img/cover_1.jpg'
import profilePhoto from '../../assets/web_img/pro_2.jpg'
import profilePhoto1 from '../../assets/web_img/pro_3.webp'
import prof1 from '../../assets/web_img/pro_1.jpg'
// import post1 from '../../assets/web_img/post_1.jpg'
import post2 from '../../assets/web_img/post_1.webp'
import post3 from '../../assets/web_img/pro_4.webp'
import goat from '../../assets/web_img/goat.png'

import axios from "axios"
import { config } from '../../constant'

const createPost = config.url.API_URL+'posts/create'
const getPosts = config.url.API_URL+'posts/'

function Profile() {
    const [postdesc, setPostDesc] = useState()
    const [posts, setPosts] = useState([])

    const getAllPosts = async url => {
        const response = await fetch(url)
        const data = await response.json()
        setPosts(await data.view)
    }

    useEffect(() => {
        getAllPosts(getPosts)
    },[])

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
  
    return (
    <section id="profile">
        {/* cover photo section  */}
        <div className="middle-sec-box cover-photo my-3 p-4" style={{backgroundImage: `url(${coverPhoto})`}}>
            <div className="profile-photo">
                
                <img src={prof1} alt="profile" />                                    
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
                <form action="" onSubmit={handleSubmit}>
                    <textarea value={postdesc} onChange={handleChange} className='comment-area' />
                    <button type='submit' className='btn btn-primary mb-3'>Submit</button>
                </form>
                
            </div>
        </div>
        {/* view post section */}
        <div className="post-area-section mb-5">
            {/* <div>{posts}</div> */}
            {/* //loop this  */}
            
            {posts && posts.map(item => {

                return (
                    
                    <div className="view-post pb-3 mt-3">
                        <div className="post-creator">
                            <Link to="/profile" className="posted-user">
                                <div className='posted-user-d'>
                                    <img src={profilePhoto1} alt="profile" className='posted-profile' />
                                    <div className="post-user-name">{item.user_info[0].firstName+ ' ' + item.user_info[0].lastName}</div>
                                </div>                                   
                            </Link>
                        </div>
                        
                        <div className="view-post-des mt-2">
                            {item.postDescription}
                        </div>
                    </div>
                )
            })} 
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
                    <img src={post2} alt="profile not found" />
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
                            <img src={profilePhoto1} alt="profile" className='posted-profile' />
                            <div className="post-user-name">Emily Burns</div>
                        </div>                                   
                    </Link>
                </div>
                <div className="view-post-img mt-3">
                    <img src={post3} alt="profile not found" />
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