import axios from 'axios'
import { useState, useEffect } from 'react'


const useForm = (callback, validate, name) => {
	const [values, setValues] = useState({})
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) callback()  	
		setIsSubmitting(false)	
	},[Object.keys(errors)])

	const handleSubmit = (event) => {
		if (event) event.preventDefault()		
		setErrors(validate(values,name))
		setIsSubmitting(true)
	}

	const handleChange = (event) => {
		event.persist()
		if(name === 'register'){
			
			let data = {}
			if(event.target.name === 'email'){
				if(!errors.email && event.target.length > 4){
					data = {
						'Email' : event.target.value
					}
					// validate(data)
					setErrors(validate(data, {'name' : 'reg', 'target' : 'email'}))
				}
			}
			if(event.target.name === 'phone'){
				if(event.target.value.length > 9 && event.target.value.length < 14){
					
					data = {
						'PhoneNo' : event.target.value
					}
					console.log(data)
					// checkUnique('phone',data)
					setErrors(validate(data, {'name' : 'reg', 'target' : 'phone'}))
				}
			}
			
		}
        if(event.target.name === 'phone')
            if(isNaN(event.target.value)) return false
		setValues(values => ({ ...values, [event.target.name]: event.target.value }))
        setErrors(validate(event.target.value, event.target.name))	
		console.table(errors)
	}

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
	}
}

export default useForm