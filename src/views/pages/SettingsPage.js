import React, { useState, useEffect } from "react";
import useForm from "../../useForm";
import validate from '../../FormValidationRules';
// core components
//import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
import LoginPage from "./LoginPage.js";
import axios from "axios";
import { config } from '../../constant';
//const getTypeUrl = config.url.API_URL+"/template/templatetypes";
//const getTemplateUrl = config.url.API_URL+"/template/templates";

const getUserUrl = config.url.API_URL+"/user/getUser";
const updateUserUrl = config.url.API_URL+"/user/updateUser";

function SettingsPage(props) {
	const [pills, setPills] = useState("1");

	/*function handleChange(event) {
		//props.onChange(event.target.name,event.target.value);
	}*/
	const [active, setActive] = useState(1);
	const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(register, validate, 'register',active,changeVal);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	function changeVal(){
	}
	function register() {
		console.log('No errors, submit callback called!');
		
		console.log(values);
		const dataArray = new FormData();
		dataArray.append("id", values.id);
		dataArray.append("firstname", values.firstname);
		dataArray.append("lastname", values.lastname);
		dataArray.append("accounttype", values.accountType);		
		dataArray.append("email", values.email);
		dataArray.append("password", values.password);
		axios.post(updateUserUrl, dataArray)
		.then((response) => {
			console.log(response);
		// successfully uploaded response
			if(response.data.status === 1){	
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;			
				const successMessage = response.data.msg;
				setSuccessMessage(successMessage);
				const timer = setTimeout(() => { setSuccessMessage('');; }, 5000);
				return () => clearTimeout(timer);
				
			}else{
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;
				const errorMessage = response.data.msg;
				setErrorMessage(errorMessage);
				const timer = setTimeout(() => { setErrorMessage('');; }, 5000);
				return () => clearTimeout(timer);
			}
		})
		.catch((error) => {
		// error response
		});
	}
	
	const [user, setUser] = useState({});
	const getUser = async () => {
		if(localStorage.getItem('token')){
			const res = await axios.get(getUserUrl,{ params: { id:localStorage.getItem('token') }});
			const user = res.data.user;
			setUser(res.data.user);
			values.id = user[0].id;
			values.firstname = user[0].first_name;
			values.lastname = user[0].last_name;
			values.email = user[0].email;
			values.accountType = user[0].account_type;
			values.password = user[0].password_text;
			values.confirmPassword = user[0].password_text;
			console.log(user);
			console.log(values);
		}
		
	};
	
	useEffect(() => {
		getUser();
	}, []);

	
	
	if(!localStorage.getItem('token')){
		return (<><LoginPage {...props} /></>);
	   props.history.push(process.env.PUBLIC_URL+'/login');
	}else{
	return (
		<div className="dashboard-main">
		<LeftNavbar />
		<div id="main">
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
                    <i class="bi bi-justify fs-3"></i>
                </a>
            </header>
            <div class="page-heading">
                <h3>Settings</h3>
                <div class="setting-wizard-btns d-flex mt-3">
                    <div class={"wizard-btns workplace" + (pills === "1" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("1"); }}>Workplace</div>
                    <div class={"wizard-btns" + (pills === "2" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("2"); }}>Personal</div>
                    <div class={"wizard-btns" + (pills === "3" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("3"); }}>Team</div>
                    <div class={"wizard-btns bill" + (pills === "4" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("4"); }}>Usage & billing</div>

                </div>
            </div>
            <div class="page-content">
                <section class={"row justify-content-center wizard-box" + (pills === "1" ? " active" : "")} >

                    
                    <div class="col-lg-7 col-md-8 mt-3">
                        <div class="w-card">
                            <div class="w-title">Company information</div>
                            <div class="ws-title">Tell us about your business</div>
                            <form action="" id="companyInformation">
                                <div class="img-div">
                                    <img src={require("../../assets/images/faces/1.jpg")} alt="not found" />
                                </div>
                                <div class="form-field">
                                    <div class="input-group">
                                        <label for="companyName">Company Name</label>
                                        <input type="text" name="companyName" placeholder="Exp: Text camp" required />
                                    </div>
                                    <div class="input-group">
                                        <label for="companyName">Primary website domain</label>
                                        <input type="text" name="websiteDomain" placeholder="exp: https://www.testcamp.com" required />
                                    </div>
                                    <div class="input-group">
                                        <label for="companyName">Billing email</label>
                                        <input type="email" name="billingEmail" placeholder="exp: jhon@mail.com" required />
                                    </div>

                                    <button class="btn btn-sub mt-4" type="submit" name="companyInfoSubmit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>

                
                <section id="personalInformation" class={"wizard-box" + (pills === "2" ? " active" : "")} >
                    <div class="row justify-content-center">
                        <div class="col-lg-7 col-md-8 mt-3">
                            <div class="w-card">
                                <div class="w-title">Personal information</div>
                                <div class="ws-title">Tell us a little about yourself</div>
                                <form action="" id="personalInformation">
                                    <div class="p-form-field">
                                        <div class="input-group">
                                            <label for="companyName">First Name</label>
                                            <input type="text" name="firstName" placeholder="exp: Emma" required />
                                        </div>
                                        <div class="input-group">
                                            <label for="companyName">Last Name</label>
                                            <input type="text" name="lastName" placeholder="exp: Stone" required />
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-sub mt-4" type="submit" name="personalInfoSubmit">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-7 col-md-8 mt-3">
                            <div class="w-card">
                                <div class="w-title">Authentication</div>
                                <div class="ws-title">Add or update your password</div>
                                <form action="" id="updatePassword">
                                   
                                        <div class="input-group">
                                            <label for="companyName">New password</label>
                                            <input type="password" name="newPassword" placeholder="*********" required />
                                        </div>
                                        

                                        <button class="btn btn-sub-2 mt-4" type="submit" name="updatePassword">Update password</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>                
                <section class={"wizard-box" + (pills === "1" ? " active" : "")} ></section>                
                <section class={"wizard-box" + (pills === "1" ? " active" : "")} ></section>

            </div>            
        </div>
		</div>
	);
	}
}

export default SettingsPage;