import { useState } from 'react'
import Gmail from '../../assets/web_img/gmail.png'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import useForm from '../../useForm'
import validate from '../../FormValidationRule'
import axios from 'axios'
import { config } from '../../constant'
const getRegisterUrl = config.url.API_URL+'users/login'
// const getRegisterUrl = "https://allphanesusernode.herokuapp.com/AllphanesuserAdd/login"

// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'

export default function Login(props) {
	const [inputfocus, setInputfocus] = useState({})
    const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(login, validate, 'login')
	// const [token, setToken] = useState()


    const navigate = useNavigate()

    function login(){

        axios.post(getRegisterUrl,values)
		.then((response) => {
			if(response.data.status === 200){
                console.log(response)
				const tokens = response.data.id
				localStorage.setItem('token', tokens)
                // console.log(tokens)
                navigate("/profile")
			}else{
				const errorMessage = response.data.message
                console.log('errmsg =>',errorMessage)
			}
		})
		.catch((error) => {
		    console.log('error=>',error)
		})
    }
  
    return (
        <>
            <form className='items-center' onSubmit={handleSubmit}>
                <h3 className=''>Welcome</h3>
                <div className='phone-tag mt-4 mb-2'>

                    {/* email  */}
                    <div className="login-form mt-4">
                        <label htmlFor="email">Email address :</label>
                        <input type="text" 
                            className="form-control form-control-xl login mt-1" 
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

                    {/* password */}
                    <div className="login-form mt-2">
                        <label htmlFor="password">Password :</label>
                        <input type="password" 
                            className="login form-control form-control-xl" 
                            autoComplete="off" 
                            placeholder="Enter password here" 
                            name="password" 
                            onFocus={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : true }))} 
                            onBlur={e => setInputfocus(inputfocus => ({ ...inputfocus, [e.target.name] : false }))} 
                            onChange={handleChange} 
                            value={values.password || ''} 
                        />
                        <div className="errors">{!inputfocus.password && errors.password}</div>
                    </div>

                </div>
                <button className="btn btns mt-4">Continue</button>
                <div className='mt-4'>Don't Have an Account? <Link className='clr-p' to="/registration">Register</Link></div>
            </form>
        </>         
    )
}

