import React from 'react'
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";

const CreateProjectEditor = (props) => {
    console.log("props", props);

    const goback=(e)=>{
        
        props.setiseditorOpen(false)
    }

    const content_long_handleChange=(e)=>{
        props.contentLongCallback(e.target.value)
    }
    const keyword_handleChange=(e)=>{
        props.keywordCallback(e.target.value)
    }
    const title_handleChange=(e)=>{
       props.titleCallback(e.target.value)
    }

    return (
       
        <div className="dashboard-main">
            <LeftNavbar />
            <div id="main">
                <header className="mb-3">
                    <a href="#" className="burger-btn d-block d-xl-none">
                        <i className="bi bi-justify fs-3"></i>
                    </a>
                </header>
                <div>
                    <p><textarea onChange={content_long_handleChange}>{props.values.content_long}</textarea></p>
                    <p><textarea onChange={keyword_handleChange}>{props.values.keyword}</textarea></p>
                    <p><textarea onChange={title_handleChange}>{props.values.title}</textarea></p>
                    {/* <p>{props.values.paragraph}</p> */}
                </div>
                <div className="page-content">
                    <div className="form-step-sec">
                        <div className="page-heading">
                            <div className="row">
                                <div className="col-12 order-md-1 order-last">
                                    <h3>New long-form content</h3>
                                    <p className="text-subtitle text-muted">Follow the steps below to start your content</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>{props.selectedIdeaStepThree}</p>
                        </div>
                        <button onClick={(e)=>goback(e)}>back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectEditor