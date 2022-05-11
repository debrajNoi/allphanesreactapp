import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit} from "@fortawesome/free-solid-svg-icons"

import { config } from '../../constant';
import axios from 'axios';
const getUserUrl = config.url.API_URL+'users/getuser/'

function Userupdate(){
    const [getuser,setuser]=useState([])
    console.log('hello',getuser);
    const id=localStorage.getItem("token");
    
    useEffect(async() => {
       const url=getUserUrl + id
       const response=await axios.get(url);
       setuser(response.data.view);
    },[])
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-9 py-5 space-section">
                    <h3>General Account Settings</h3><hr/>
                {
                  getuser.map((item)=>{
                      return(
                        //   console.log(item.id)
                          <>
                          <tr className="table-section">
                              <td className="table-content"><b>Name</b> {item.firstName} {item.lastName}</td>
                              <td> <Link to="" className="space_tex">Edit </Link><button className="edit-btns"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></td>
                          </tr><hr/>
                          <tr className="table-section">
                              <td className="table-content"><b>Contact</b> {item.phone}</td>
                              <td><Link to="" className="space_tex">Edit </Link><button className="edit-btns"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></td>
                          </tr><hr/>
                          <tr className="table-section">
                              <td className="table-content"><b>Ad Account Contact</b> {item.email}</td>
                              <td><Link to="" className="space_tex">Edit </Link><button className="edit-btns"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></td>
                          </tr><hr/>
                         {/* <h6>Name {item.firstName} {item.lastName}</h6><Link to={"editview/"+item.id}>EDit</Link><hr/>
                         <p>Contact {item.phone}</p><hr/>
                         <p>Email {item.email}</p> */}
                          </>
                      )
                  })  
                }
                </div>
            </div>
        </div>
        </>
    )
}
export default Userupdate