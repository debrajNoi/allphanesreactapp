import React from "react";
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/web_img/main_logo.png'
import axios from "axios"
import { config } from '../../constant'

const usersUrl = config.url.API_URL+'users/'
function IndexNavbar() {
	const [isActive, setActive] = useState(false);
	// const [auth, setAuth] = useState(false)
	const navigate = useNavigate()
	const toggleClass = () => {
		setActive(!isActive);
	};

	const tokens = localStorage.getItem('token')
	
	const logout = async e => {
		const response = await axios.patch(usersUrl + tokens,{isActive : false})
		if(response){
			localStorage.clear()
			navigate("auth/login")
		}
	}

	
    // if(localStorage.getItem('token') != '') setAuth(true)
	
	return (
		<header id="header" className="index-header">
			<div className="nav-main">
				<div className="logo-top">
					<Link to="/home">
						<img src={logo} alt="not found" />	
					</Link>
				</div>
				
				<div className="nav-right">
					{/* <div className=""> */}
						<ul className={isActive ? 'nav-middle active': 'nav-middle'}>
							<li className="nav-item"> <Link className="nav-link" to="/home">Home</Link> </li>
							{tokens && <li className="nav-item"><Link className="nav-link" to="/mycanvas">My Canvas</Link></li>}
							<li className="nav-item"><Link className="nav-link" to="/plan">Plan & Pricing</Link></li>
							<li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
							{!tokens && <li className="nav-item"><Link className="nav-link" to="auth/login">Sign in</Link></li>}
							{!tokens && <li className="nav-item"><Link className="nav-link btn-signs shadow-sm" to="auth/registration">Sign up</Link></li>}
							{tokens && <li className="nav-item"><button className="btn btn-signs shadow-sm sign-out-btn" onClick={logout}>Sign Out</button></li>}
								
						</ul>
						
					{/* </div> */}
					<div className="nav-right">
						{/* <div className="menu-buttn">
							<a href={`${process.env.PUBLIC_URL}/register`} className="new-button nav-btn">Start Free Trial</a>
						</div> */}
						<div className={isActive ? 'hamburger active': 'hamburger'} onClick={toggleClass}>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
						</div>
					</div>
				</div>


			</div>    
		</header>
	);
}			
			
export default IndexNavbar;