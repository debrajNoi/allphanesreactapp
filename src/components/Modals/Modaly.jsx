import React,{useState, useEffect} from "react";
import {Modal, Button} from 'react-bootstrap'
import images from '../../assets/web_img/bg2.jpg'

import axios from "axios"
import { config } from '../../constant'

const editUser = config.url.API_URL+'users/profilephoto'
const getUserUrl = config.url.API_URL+'users/'

function Modaly(props) {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [values, setValues] = useState()
    const [errMsg, setErrMsg] = useState('');
    const token = localStorage.getItem("token")
    
    const getSingleUser = async e => {
        const url = getUserUrl + token
        const response = await axios.get(url)
        props.posts(await response.data.responseData)
        
    }

    const addImage = () =>{

    }

    const handleFileInputChange = e => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = e => {
        e.preventDefault();
        console.log("selec =>",selectedFile)
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(selectedFile);
            setSelectedFile('')
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (image) => {
        try {
            const formData = new FormData()
            formData.append("profilePhoto",image)
            formData.append("id",token)
            const response = await axios.post(editUser,formData)
            console.log(response)
            getSingleUser()
            setFileInputState('');
            setPreviewSource('');
            setValues('')
            props.onHide()
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    const closeModal = () =>{
        setFileInputState('');
        setPreviewSource('');
        setValues('')
        props.onHide()
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="bs_modal"
      >
        <Modal.Body style={{position: "relative"}}>
            <div className="row">
                <div className="col-lg-5 post_img">
                    {previewSource &&  <img src={previewSource} alt="modal" style={{height : "100%"}} /> }
                </div>
                
                <form onSubmit={handleSubmitFile} className="col-lg-7" encType="multipart/formdata">
                    <div onClick={closeModal} className="modal_close_btn">x</div>

                    <label htmlFor="gallery">Choose from gallery</label>
                    <div className="gal_frame mt-3">
                        <img src={images} className="photo_frame" alt="gallery" onClick={addImage}/>
                        <img src={images} className="photo_frame" alt="gallery" />
                        <img src={images} className="photo_frame" alt="gallery" />
                        <img src={images} className="photo_frame" alt="gallery" />
                        <img src={images} className="photo_frame" alt="gallery" />
                        <img src={images} className="photo_frame" alt="gallery" />
                        <img src={images} className="photo_frame" alt="gallery" />
                        <div className="photo_frame"></div>
                        <div className="photo_frame"></div>
                        <div className="photo_frame"></div>
                        <div className="photo_frame"></div>
                        <div className="photo_frame"></div>
                        <div className="photo_frame"></div>
                        <div className="photo_frame"></div>
                    </div>

                    <div className="modal_image_input">
                        <label className="mt-3"> Browse
                            <input type='file' name="postImage" onChange={handleFileInputChange} value={fileInputState} required/>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
            </div>    
        </Modal.Body>
        
      </Modal>
    );
  }
  
  export default Modaly

  

