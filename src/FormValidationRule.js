import axios from 'axios'
import { config } from './constant'
const getRegisterUrl = config.url.API_URL+'/AllphanesuserAdd/checkunique";
let errors1 = {}
export default function validate(values,callback) {
	const checkUnique = (data,tar) =>{
        //console.log('rega =>', tar.name)
		axios.post(unique, data)
		.then((res) =>{
			if(res.data.status === 401) return errors1[tar.target] = res.data.message 
				
		})
	}
    // email validation 
    const emailValidate = data =>{
        if (!data) return errors1.email = 'Email address is required'
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) return errors1.email = 'Invalid Email address'
        return delete errors1.email
    }

    // password validation 
    const passwordValidate = data =>{
        if (!data) return errors1.password = 'Password is required'
        if (data.length < 6) return errors1.password = 'Password must be 6 or more characters'
        return delete errors1.password
    }

    // Indian Mobile number validation 
    const mobileValidationIndian = data => {
        if(!data) return errors1.phone = 'Phone number required'
        if(isNaN(data)) return errors1.phone ='Phone number should be in Numbers.'
        if(data.length < 10) return errors1.phone ='Atleast 10 Numbers required'
        if(data.length > 14) return errors1.phone ='Atmost 14 Numbers allowed if you entered the country code like +91 or 0091'
        if(!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(data)) return errors1.phone = 'Invalid Phone number'
        return delete errors1.phone 
    }

    // name validation 
    const nameValidate = (data, fieldName, msg) =>{
        if (!data) return errors1[fieldName] = msg + ' is required'
        if(!isNaN(data)) return errors1[fieldName] = msg + ' should be string type.'
        if(data.length < 3) return errors1[fieldName] = 'Atleast 3 Characters required'
        if(data.length > 32) return errors1[fieldName] = 'Atmost 32 characters allowed.'
        return delete errors1[fieldName]
    }

    //calling validation functions according to callbacks
    
    //on handle Changes
    if(callback === "firstName") nameValidate(values, 'firstName', 'First name')
    if(callback === "lastName") nameValidate(values, 'lastName', 'Last name')
    if(callback === "phone") mobileValidationIndian(values)
    if(callback === "password") passwordValidate(values)
    if(callback === "email") emailValidate(values)

    // on handleSubmits
    if(callback === "login"){
        emailValidate(values.email)
		passwordValidate(values.password)
	}

    if(callback === "register"){
        nameValidate(values.firstName, 'firstName', 'First name')
        nameValidate(values.lastName, 'lastName', 'Last name')
        emailValidate(values.email)
        mobileValidationIndian(values.phone)	
	}

    if(callback.name === 'reg'){
        checkUnique(values, callback)
    }

    return errors1
};