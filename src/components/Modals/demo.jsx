import React,{useState, useEffect} from "react";
import {Modal, Button} from 'react-bootstrap'
import images from '../../assets/web_img/bg1.webp'

import axios from "axios"
import { config } from '../../constant'

const createPost = config.url.API_URL+'posts/creategallery'
// const getPosts = config.url.API_URL+'posts/'

function MyVerticallyCenteredModal(props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  // const [values, setValues] = useState({})
  const [errMsg, setErrMsg] = useState('');

  
  const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result);
      };
  };

  const handleSubmitFile = (e) => {
      e.preventDefault();
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
          uploadImage(reader.result);
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
          setErrMsg('something went wrong!');
      };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
        // console.log(selectedFile)
        // const data  = new FormData()
        // data.append("image",selectedFile)
        // data.append("text","test")
        const data = {
          image : base64EncodedImage,
          text : "hala madrid"
        }
        const res = await axios.post(createPost, data)
        console.log(res)
        setFileInputState('');
        setPreviewSource('');
        setSuccessMsg('Image uploaded successfully');
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
  };

    const closeModal = e =>{
      props.onHide()
      // setPreview(undefined)
      return () => URL.revokeObjectURL(selectedFile)
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
          header
        </div>
        <Modal.Body className="pd-0">
          <div className="row pd-0">
              <div className="col-lg-7 pd-0 post_img">
                {previewSource &&  <img src={previewSource} alt="modal" /> }
              </div>
              
              <form onSubmit={handleSubmitFile} className="col-lg-5" encType="multipart/formdata">
                <label> Enter Your File
                  <input type='file' name="postImage" accept=".jpg, .jpeg, .png" onChange={handleFileInputChange} value={fileInputState} />
                </label>
                <input type='file' name="postImage" accept=".jpg, .jpeg, .png" onChange={handleFileInputChange} value={fileInputState} />
                <Button type="button" onClick={closeModal}>Close</Button>
                <div className="text">
                  <label htmlFor="share">Share something here</label>
                  {/* <textarea name="postText" className="mt-3" rows="4" style={{"width" : "100%"}}></textarea> */}
                </div>
                <button type="submit">Post</button>
              </form>
          </div>    
        </Modal.Body>
        
      </Modal>
    );
  }
  
 export default function App() {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)} backdrop="static"
        />
      </>
    );
  }
  
//   render(<App />);