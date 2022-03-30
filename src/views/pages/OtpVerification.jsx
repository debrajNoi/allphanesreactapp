import React, {useState} from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import axios from "axios"
import { config } from '../../constant'
const getRegisterUrl = config.url.API_URL+'users/otpverification'
const resendOtpApi = config.url.API_URL+'users/resendotp'

export default function OtpVerification(props){
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [errorMsg, setErrorMsg] = useState()
    const [resendMsg, setResendMsg] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    if(!token) return <Navigate to="/auth/login" />
    
    const resendOtp = () =>{
        let data = {
            "id" : token
        }
        console.table(data)
        axios.post(resendOtpApi,data)
		.then((response) => {
            console.table(response.data)
            if(response.data.ack === '1'){
                setResendMsg(response.data.message)
            }
		})
		.catch(err => {
		    console.log('error=>',err)
		})
    }

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
            "id":token,
            "otp" : otp.join("")
        }
        axios.post(getRegisterUrl,data)
		.then((response) => {
            console.log(response)
            const result = response.data.status === 200 ? 
                navigate("/profile") 
                : setErrorMsg(response.data.message)
            return result
		})
		.catch(err => {
		    console.log('error=>',err)
		})
    }
    // '246562'
    return(
        <>
            <form className='align-center' onSubmit={handleSubmit}>
                
                <h3>Almost There</h3>
                <div className='phone-tag mt-4 mb-3'>
                    <h6>Please enter 6 digit otp that we just sent on email <span className="clr-p"></span></h6>
                    {errorMsg && 
                        <div className="err-msg2">
                            {errorMsg}
                        </div>
                    }
                    {resendMsg && 
                        <div className="bg-white p-3 clr-p">
                            {resendMsg}
                        </div>
                    }
                    <div className='w-300 my-4 bg-w p_4'>
                        <div className="otp-fields">
                            {otp.map((data, index) => {
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
                            {/* <Link to="/login" className="clr-p">Edit Email</Link> */}
                            <div className="cur-p" onClick={resendOtp}>Resend OTP</div>
                        </div>
                    </div>
                    <h6 className="clr-p">Can't find the email please check spam folder.</h6>
                    {/* <div className='mt-4'>By continue you are agree to our <Link to="/terms" className='clr-p'>Terms of use</Link> & <Link className='clr-p' to="/privacy-policy">Privacy Policy</Link></div> */}
                </div>
                
                <button className="btn btns">Continue</button>
            </form>
        </>
    )
}