import React, { useEffect, useState } from "react";
import { config } from '../../constant'
import LeftNavbar from '../../components/Navbars/LeftNavbar'
import RightBar from '../../components/Navbars/RightBar'
import axios from "axios"

const getDataUrl = config.url.API_URL + 'posts/gellary/'

function Gellary() {

    const [gellarys, setGellary] = useState([])
    const token = localStorage.getItem('token')
    
    const getGellarylist = async () => {
        const response = await axios.get(getDataUrl + token)
        console.log("kk>>>",response)
        setGellary(await response.data.view)
    }

    useEffect(() => {
        getGellarylist();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <LeftNavbar />
                    </div>
                    <div className="col-lg-5 col-md-6 members-sec">
                        <h4 className='my-4'>Photo Gallery</h4>
                        <div className="gallery-item">
                        {
                            gellarys.map((item, index) => {
                                return (
                                    
                                    
                                        // <div className="gallery-item" key={index}>
                                            <img className="gallery-img" key={index} src={item.postImagePath} />
                                        // </div>
                                    

                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-3">
                        <RightBar />
                    </div>
                </div>
            </div>

        </div>
        //     <>
        //     <h1>gellary</h1>
        //     {/* <img src={item.postImage}/> */}
        //     <div class="container">
        //     <div className="row">
        //       <div class="card-group">

        // {
        //    gellarys.map((item)=>{
        //        return(
        //         //    <div className="row">

        //         <div class="card">
        //         <div class="col-md-12">

        //  <img src={item.postImage} style={{height: "300px"}}/>
        //      </div>
        //   </div>
        // //   </div>
        //        )
        //    }) 
        // }

        // </div>
        //  </div>
        // </div>

        //     </>
    )
}
export default Gellary;