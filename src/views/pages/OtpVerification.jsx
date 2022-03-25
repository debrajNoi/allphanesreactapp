import React, {useState} from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import Gmail from '../../assets/web_img/gmail.png'
import axios from "axios"
import { config } from '../../constant'
const getRegisterUrl = config.url.API_URL+'AllphanesuserAdd/otpverification'
// import { useEffect } from "react"

export default function OtpVerification(props){
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const navigate = useNavigate()

    if(!localStorage.getItem('token')) return <Navigate to="/login" />
    

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
        let nextPlusOne = element.nextElementSibling
        let prevPlusOne = element.previousSibling
        
        //Focus next input
        element.value ? nextPlusOne.nextSibling.focus() : prevPlusOne.previousSibling.focus()
    }

    const handleSubmit = e =>{
        e.preventDefault()
        let token = localStorage.getItem('token')
        let data = {
            "userToken":token,
            "otp" : otp.join("")
        }
        console.log('brodata =>',data)
        axios.post(getRegisterUrl,data)
		.then((response) => {
			if(!response.data.status === 200){
                const errorMessage = response.data.message
                return console.log('errmsg =>',errorMessage)
			}
            return alert(response.data.message)
		})
		.catch(err => {
		    console.log('error=>',err)
		})
    }

    return(
        <>
            <form className='align-center' onSubmit={handleSubmit}>
                <h3>Almost There</h3>
                <div className='phone-tag mt-4 mb-3'>
                    <h6>Please enter 6 digit otp that we just sent on email : <span className="clr-p"></span></h6>
                    <div className='w-300 my-4 bg-w p_4'>
                        <div className="otp-fields">
                            {otp.map((data, index) => {
                                console.log(data)
                                return (
                                    <>
                                        <input
                                        className="otp-field"
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={e => handleChange(e.target, index)}
                                        onFocus={e => e.target.select()}
                                        required
                                    />
                                    <span className="bar"></span>
                                    </> 
                                )
                            })}
                        </div>
                    

                        <div className="otp-fields mt-1 clr-p">
                            <Link to="/login" className="clr-p">Edit Email</Link>
                            <div>Resend OTP</div>
                        </div>
                    </div>
                    <div className='mt-4'>By continue you are agree to our <Link to="/terms" className='clr-p'>Terms of use</Link> & <Link className='clr-p' to="/privacy-policy">Privacy Policy</Link></div>
                </div>
                <div>OR</div>
                <div className='mt-4 mb-5'>
                    <img src={Gmail} alt="not found"></img>
                </div>
                <button className="btn btns">Continue</button>
            </form>
        </>
    )
}