import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";
import logo from '../../assets/web_img/main_logo.png'


function IndexNavbar() {
	const [isActive, setActive] = useState(false);
	
	const toggleClass = () => {
		setActive(!isActive);
	};

	// className={isActive ? 'your_className': null} onClick={toggleClass} 	

	return (
		<header id="header" className="index-header">
			<div className="nav-main">
				<div className="logo-top">
					<Link to="/profile">
						<img src={logo} alt="not found" />	
					</Link>
				</div>

				<div className="nav-right">
					{/* <div className=""> */}
						<ul className={isActive ? 'nav-middle active': 'nav-middle'}>
							<li className="nav-item active"> <a className="nav-link" href={`${process.env.PUBLIC_URL}/profile`}>Plan & Pricing</a> </li>
							<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/profile`} > Support </a></li>
							<li className="nav-item">
								<a className="nav-link" href={`${process.env.PUBLIC_URL}/login`} data-bs-toggle="dropdown">Sign in</a>                    
							</li>
							<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/registration`}>Sign up</a></li>
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