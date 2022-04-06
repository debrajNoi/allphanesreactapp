import React from "react";


function IndexNavbar() {

	return (
		<header id="header" className="header">
			<div className="container">
				<div className="row">
					<div className="col-md-3"><div className="logo-top"><a href={`${process.env.PUBLIC_URL}/index`}>LOGO</a></div></div>
					<div className="col-md-7">
						<nav className="navbar navbar-expand-lg top-menu-sec">
							<div className="container-fluid">
								
								<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"  aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse" id="main_nav">
									<ul className="navbar-nav">
										<li className="nav-item active"> <a className="nav-link" href={`${process.env.PUBLIC_URL}/pricing`}>Pricing</a> </li>
										<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/contact`} > Contact </a></li>
										<li className="nav-item dropdown">
											<a className="nav-link  dropdown-toggle" href={`${process.env.PUBLIC_URL}/resources`} data-bs-toggle="dropdown">Resources</a>                    
										</li>
										<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/login`}>Login</a></li>
									</ul>
								</div> 
							</div> 
						</nav>
					</div>
					<div className="col-md-2">
						<div className="menu-button"><a href={`${process.env.PUBLIC_URL}/register`} className="new-button">Start Free Trial</a></div>
					</div>
				</div>
			</div>    
		</header>
	);
}			
			
export default IndexNavbar;