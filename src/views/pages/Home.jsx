import React from 'react'
import banner from '../../assets/web_img/banner.png'
import fea1 from '../../assets/web_img/fea-4.png'
import fea2 from '../../assets/web_img/fea-5.png'
import fea3 from '../../assets/web_img/fea-6.png'
import chotologo from '../../assets/web_img/choto_logo_1.png'

function Home() {
  return (
    <main>
        <section id='banner'>
            <div className='container'>
            <div className="row justify-content-center">
            <div className="col-lg-7 col-md-5">
                <div className='center-item'>
                    <div className='banner_content p-md-5'>
                        <h1 className='m-0'>a <span>Forum</span></h1>
                        <h2 className='m-0'><span>Where creators,</span> professionals and others can provide, market and get paid for their
                            creations, products and services. 
                        </h2>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 col-md-6">
                {/* <img src={banner} alt="banner" className='banner-img mt-5' /> */}

{/* <img src='https://www.pngplay.com/wp-content/uploads/12/Microphone-PNG-Photos.png' /> */}

            </div>
            </div></div>
        </section>

        <section id="features" className='container-fluid home_back_img'>
          
                <h1 className='text-center pt-5 mb-5'>Our Features</h1>

<div className='container features_propraty'>
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="center-item">
                            <div className='px-4 content'>
                                <h2>Subscription</h2>
                                <h4>Run your own Subscription services on your own terms and start making Big cash every month</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pt-5">
                        {/* <img src={fea1} alt="banner" className='fea-img'  />   */}
                        <img src="https://www.yamaha.com/en/musical_instrument_guide/common/images/piano/parts_viewer01.jpg" alt="banner" className='fea-img'  />   
                    </div>
                </div>
                </div>
                <div className='container features_propraty'>             
                <div className="row">
                    <div className="col-lg-4 col-md-6  pd-0">
                        {/* <img src={fea2} alt="banner" className='fea-img'  />    */}
<img src='https://rukminim2.flixcart.com/image/416/416/j0zlevk0/fm-radio/v/h/p/pyle-ptcdcs32bt-retro-vintage-classic-bluetooth-turntable-original-imaesmtfxmhgejzz.jpeg?q=70' className='fea-img'/>



                    </div>
                    <div className="col-lg-8 col-md-6">
                        <div className="center-item">
                            <div className='px-4 content'>
                                <h2>Sell Digitally</h2>
                                <h4 >
                                    Product sales services for people who have digital things to sell (music, books, pictures, etc)
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className='container features_propraty'>
                <div className="row">

                    <div className="col-lg-8 col-md-6">
                        <div className="center-item">
                            <div className='px-4 content'>
                                <h2>Make Money</h2>
                                <h4>
                                    you get to earn from your content, share Images & Videos and let your fans support you financially
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pd-0">
                        {/* <img src={fea3} alt="banner" className='fea-img'  />    */}

                        <img src='https://cdn-icons-png.flaticon.com/512/2456/2456662.png' className='fea-img' />
                    </div>
                    
                </div>
                </div>
           


        </section>

        {/* <section id='tbd' className=''>
            <div className="tbd container text-center">
                <h1 className='text-center'>Content  To Be Decided</h1>
            </div>
        </section> */}
    </main>
  )
}

export default Home