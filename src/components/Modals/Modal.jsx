import React,{useState, useEffect} from "react";
import {Modal, Button} from 'react-bootstrap'
import images from '../../assets/web_img/bg1.webp'

import axios from "axios"
import { config } from '../../constant'

const createPost = config.url.API_URL+'posts/creategallery'
const getPosts = config.url.API_URL+'posts/'

function Modalx(props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [values, setValues] = useState('')
  const [errMsg, setErrMsg] = useState('');
  const token = localStorage.getItem("token")
 
  const getAllPosts = async url => {
    const response = await fetch(url)
    const data = await response.json()
    props.posts(await data.view)
    console.log('result => ', data.view)
}

  const handleChange = e =>{
    setValues(e.target.value)
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
      const data = new FormData()
      data.append("referenceUserId", token)
      data.append("image",image)
      data.append("title", "hala madrid")
      data.append("text", values)
      const res = await axios.post(createPost, data)
      setFileInputState('');
      setPreviewSource('');
      setValues('')
      getAllPosts(getPosts)
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
        <div className="modal_header text-center">
          <div type="button" onClick={closeModal}>X</div>
        </div>
        <Modal.Body className="pd-0">
          <div className="row pd-0">
              <div className="col-lg-7 pd-0 post_img">
                {previewSource &&  <img src={previewSource} alt="modal" /> }
              </div>
              
              <form onSubmit={handleSubmitFile} className="col-lg-5" encType="multipart/formdata">
                <label> image
                  <input type='file' name="postImage" onChange={handleFileInputChange} value={fileInputState} required/>
                </label>
                <div className="text">
                  <label htmlFor="share mt-3">Share something here</label>
                  <textarea name="postText" className="mt-3" rows="4" style={{"width" : "100%"}} onChange={handleChange} value={values || ''}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Post</button>
              </form>
          </div>    
        </Modal.Body>
        
      </Modal>
    );
  }
  
  export default Modalx

  