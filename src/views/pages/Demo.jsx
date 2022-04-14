import React, { useState } from "react"
import axios from "axios"
import { config } from '../../constant'

const editUser = config.url.API_URL+'users/editx'

function Demo(){
    const id = localStorage.getItem("token")
    const [photos, setPhotos] = useState({})

    const handleSubmit = async e =>{
        console.log(photos)
        e.preventDefault()
        const formData=new FormData()
        formData.append("profilePhoto",photos.profilePhoto)
        formData.append("coverPhoto",photos.coverPhoto)
        formData.append("id",id)
        const config={
            headers:{
                'content-type':'multipart/form-data',
            }
        }

        const response = await axios.post(editUser,formData)
        response ? alert("image upload success") : alert("image bll")
    }
   
    const handlePhotos = e =>{
        setPhotos(photos => ({...photos, [e.target.name] : e.target.files[0]}))
        console.log(photos)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <h1>profile upload</h1>
            <input type="file" name="profilePhoto" onChange={handlePhotos}/>
            <input type="file" name="coverPhoto" onChange={handlePhotos}/>
            <button type="submit">Upload</button>
        </form>
        </>
    )
}
export default Demo