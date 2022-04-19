import React,{useState, useEffect} from 'react'

function EditProfile() {
    const [user, setUser] = useState()

    const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(updateUser, validate, 'register')

    const navigate = useNavigate()
	
	function updateUser() {
		console.log('No errors, submit callback called!')
	
		axios.post(getRegisterUrl,values)
		.then((response) => {
			console.table(response.data)			
			if(response.data.status === 200){
				const token = response.data.id
                localStorage.setItem('token',token)
                navigate("/auth/verification")
			}else{
				setErrMsg(response.data.message)
			}
		})
		.catch(err => {
		    console.log('error=>',err)
		})
	}

  return (
    <div>EditProfile</div>
  )
}

export default EditProfile