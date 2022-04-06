import React,{useState, useEffect} from "react";
import {Modal, Button} from 'react-bootstrap'
import images from '../../assets/web_img/bg1.webp'

function MyVerticallyCenteredModal(props) {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="pd-0">
          <div class="row pd-0">
              <div className="col-lg-7 pd-0">
                {/* <img src={images} alt="modal" /> */}
                {selectedFile &&  <img src={preview} alt="modal" /> }
              </div>
              <div className="col-lg-5">
              <input type='file' onChange={onSelectFile} />
            
              </div>
          </div>    
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
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