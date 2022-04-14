import React, { useState } from "react";
import axios from "axios";

function Demo(){
    const id = localStorage.getItem("token")
   const [ids, setids]=useState('');
   
   console.log("token",ids);
    
    const [file,setfile]=useState(null);
    console.log(file);

    function onFormSubmit(e){
        e.preventDefault();
        // const id = localStorage.getItem("token")
        // console.log(id);
        const formData=new FormData();
        formData.append("profilePhoto",file);
        const config={
            headers:{
                'content-type':'multipart/form-data',
            }
        }
        
          setids(id);
          console.log('hh',file);
        const url = 'https://localhost:8000/api/users/edit/'+ids;
        axios.post(url,formData,config).then((response)=>{
            alert("image upload success")
        }).catch((err)=>{
            alert("image bll")
        })
    }
   function onInputChange(e){
    setfile(e.target.files[0])
    
   }
    return(
        <>
        <form onSubmit={onFormSubmit}>
        <h1>profile upload</h1>
        <input type="file" name="profilePhoto" onChange={onInputChange}/>
        <button type="submit">Upload</button>
        </form>
        </>
    )
}
export default Demo;