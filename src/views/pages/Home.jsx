import React from 'react'
import banner from '../../assets/web_img/banner.png'

function Home() {
  return (
    <main>
        <section id='banner' className='container-fluid'>
            <div className="row px-3">
            <div className="col-lg-6">
                <div className='center-item'>
                    <p>comming soon ...............</p>
                </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4">
                <img src={banner} alt="banner" className='banner-img' />
            </div>
            </div>
        </section>
    </main>
  )
}

export default Home