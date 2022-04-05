import React from 'react'
import banner from '../../assets/web_img/banner.png'
import fea1 from '../../assets/web_img/fea1.png'
import fea2 from '../../assets/web_img/fea2.png'
import fea3 from '../../assets/web_img/fea3.png'
import chotologo from '../../assets/web_img/choto_logo-removebg.jpg'


function Home() {
  return (
    <main>
        <section id='banner' className='container-fluid'>
            <div className="row px-4">
            <div className="col-lg-5 pr-3 col-md-5">
                <div className='center-item'>
                    <div>
                        <h1>a <span className='clr-1'>Forum</span> </h1>
                        <h2 className='text-center'>Where creators,</h2>
                        <h2>
                            professionals and others can provide, market and get paid for their
                            creations, products and services. 
                        </h2>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-1"></div>
            <div className="col-lg-5 col-md-5">
                <img src={banner} alt="banner" className='banner-img mt-5' />
            </div>
            </div>
        </section>

        <section id="features" className='container-fluid'>
            <h1 className='text-center ff-1'>Our Features</h1>
            <div className="row mt-5">
                <div className="col-lg-6 col-md-6">
                    <div className="center-item">
                        <div className='px-4'>
                            <h2>Subscription</h2>
                            <h3 className='mt-5 px-4 text-center'>Run your own Subscription services on your own terms and start making Big cash every month</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6  pd-0">
                     <img src={fea1} alt="banner" className='fea-img'  />   
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-6 col-md-6  pd-0">
                     <img src={fea2} alt="banner" className='fea-img'  />   
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="center-item">
                        <div className='px-4'>
                            <h2>Sell Digitally</h2>
                            <h3 className='mt-5 px-4 text-center'>
                            Product sales services for people who have digital things to sell (music, books, pictures, etc)
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col-lg-6 col-md-6">
                    <div className="center-item">
                        <div className='px-4'>
                            <h2>Make Money</h2>
                            <h3 className='mt-5 px-4 text-center'>
                            you get to earn from your content, share Images & Videos and let your fans support you financially
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 pd-0">
                     <img src={fea3} alt="banner" className='fea-img'  />   
                </div>
                
            </div>
        </section>

        <section id='tbd'>
            <div className="tbd">
                <div className="circles">
                    <img src={chotologo} alt="chotologo" />
                </div>
                <div className="circles">
                    <img src={chotologo} alt="chotologo" />
                </div>
                <div className="circles">
                    <img src={chotologo} alt="chotologo" />
                </div>
                <div className="circles">
                    <img src={chotologo} alt="chotologo" />
                </div>
            </div>
        </section>
    </main>
  )
}

export default Home