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
		
        if(event.target.name === 'phone')
            if(isNaN(event.target.value)) return false
		setValues(values => ({ ...values, [event.target.name]: event.target.value }))
        setErrors(validate(event.target.value, event.target.name))	
	}

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
	}
}

export default useForm