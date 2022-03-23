import React, { useState } from "react"
import useForm from "../../useForm"
import validate from '../../FormValidationRule'
import { Link, useNavigate,useLocation } from "react-router-dom"
import axios from "axios"
import { config } from '../../constant'
let getRegisterUrl = config.url.API_URL+'/AllphanesuserAdd/allphanuser';


function Registration(props) {
	const [inputfocus, setInputfocus] = useState({})
	const [token, setToken] = useState()
	
	const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(register, validate, 'register')

    const navigate = useNavigate()
	
	function register() {
		console.log('No errors, submit callback called!')
		const data = {
			"FirstName": values.firstName,
			"LastName": values.lastName,
			"Email": values.email,
			"PhoneNo": values.phone,
			"Password": values.password
		}
		
		axios.post(getRegisterUrl,data)
		.then((response) => {			
			if(response.data.status === 200){
				const token = response.data.token
				setToken(token)
                localStorage.setItem('token',token)
                navigate("/otp-verification")
			}else{
				const errorMessage = response.data.message
			}
		})
		.catch(err => {
		    console.log('error=>',err)
		})
	}
  
  return (
    <>
      <form className="align-center" onSubmit={handleSubmit}>
			<h3 className='text-center'>Welcome</h3>
			<div className='reg-div mt-4 mb-2'>
				<div className="name-div">
					
					{/* firstname  */}
					<div className="form-group position-relative has-icon-left mb-2">
						<label htmlFor="" className="log-input-title">First Name :</label>
						
						<input type="text" 
							className="form-control form-control-xl mt-2" 
							autoComplete="off" 
							placeholder="Enter first name here" 
							name="firstName" 
							onFocus={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : true }))} 
							onBlur={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : false }))} 
							onChange={handleChange} 
							value={values.firstName || ''} 
						/>

						<div className="errors">{!inputfocus.firstName && errors.firstName}</div>
					</div>

					{/* last name  */}
					<div className="form-group position-relative has-icon-left mb-2">
						<label htmlFor="" className="log-input-title">Last Name :</label>
						<input type="text" 
							className="form-control form-control-xl mt-2" 
							autoComplete="off" 
							placeholder="Enter last name here" 
							name="lastName" 
							onFocus={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : true }))} 
							onBlur={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : false }))} 
							onChange={handleChange} 
							value={values.lastName || ''} 
						/>
						<div className="errors">{!inputfocus.lastName && errors.lastName}</div>
					</div>
				</div>
				
				{/* email  */}
				<div className="form-group position-relative has-icon-left mb-2">
					<label htmlFor="" className="log-input-title">Email address :</label>
					<input type="text" 
						className="form-control form-control-xl mt-2" 
						autoComplete="off" 
						placeholder="Enter email address here" 
						name="email" 
						onFocus={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : true }))} 
						onBlur={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : false }))} 
						onChange={handleChange} 
						value={values.email || ''} 
					/>
					<div className="errors">{!inputfocus.email && errors.email}</div>
				</div>

				{/* phone  */}
				<div className="form-group position-relative has-icon-left mb-2">
					<label htmlFor="" className="log-input-title">Phone :</label>
					<input type="tel" 
						className="form-control form-control-xl mt-1" 
						autoComplete="off" 
						placeholder="Enter 10 digit mobile number here" 
						name="phone" 
						onFocus={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : true }))} 
						onBlur={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : false }))}  
						onChange={handleChange} value={values.phone || ''} />
					<div className="errors">{!inputfocus.phone && errors.phone}</div>
				</div>

				{/* password  */}
				<div className="form-group position-relative has-icon-left mb-2">
					<label htmlFor="" className="log-input-title">Password :</label>
					<input type="password" 
						className="form-control form-control-xl mt-1" 
						autoComplete="off" 
						placeholder="Enter password here" 
						name="password" 
						onFocus={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : true }))} 
						onBlur={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : false }))} 
						onChange={handleChange} 
						value={values.password || ''} />
					<div className="errors">{!inputfocus.password && errors.password}</div>
				</div>
			</div>
			
			<button className="btn btns mt-3">Continue</button>
			<div className="mt-3">Already have an account? goto <Link className="clr-p" to="/login">Sign In</Link></div>
		</form>
    </>
  )
}

export default Registration
